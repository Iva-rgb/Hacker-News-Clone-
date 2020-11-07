/* eslint-disable no-unused-vars */
import { reactive, readonly, ref } from "vue";
import axios from 'axios';

const BASE_URL = "http://localhost:8080";

const state = reactive({
    inputValue: ref(''),
    newsItems: ref([]),
    displayedResults: ref([]),
    homeNews: ref([]),
    searchQuery: ref(''),
    arrayOfKids: ref([]),
    key: ref(0),
    incrementor: ref(20),
    isSearched: ref(false),
    renderComments: ref(false),
    filteredByType: ref(false),
    filteredByTime: ref(false)
})

//Setters
const setInputValue = function(value) {
    state.inputValue = value;
}
const setNewsItems = function(items) {
    state.newsItems = items;
}
const setDisplayedResults = function(results) {
    state.displayedResults = results;
}
const setIsSearched = function(isSearched) {
    state.isSearched = isSearched;
}
const setSearchQuery = function(searchQuery) {
    state.searchQuery = searchQuery;
}

//Getters
const getNewsItems = function() {
    return state.newsItems;
}
const getDisplayedResults = function() {
    return state.displayedResults;
}
const getIsSearched = function() {
    return state.isSearched;
}
const getSearchQuery = function() {
    return state.searchQuery;
}
const getArrayOfKids = function() {
    return state.arrayOfKids;
}
const getRenderComments = function() {
    return state.renderComments;
}

//Fetching data
const fetchApi = async() => {

    const items = ref([]);
    await axios.get(`${BASE_URL}/v0/topstories.json`).then((response) => {
        let topStories = response.data.slice(0, 25);
        topStories.forEach((element) => {
            axios.get(`${BASE_URL}/v0/item/${element}.json`).then((result) => {
                items.value.push(result);
            });
        });
    });

    await axios.get(`${BASE_URL}/v0/newstories.json`).then((response) => {
        let bestStories = response.data.slice(0, 25);
        bestStories.forEach((element) => {
            axios.get(`${BASE_URL}/v0/item/${element}.json`).then((result) => {
                state.incrementor = 10;
                items.value.push(result);
                setDisplayedResults(items.value.slice(0, 20));
                setNewsItems(items.value);
            });
        });
    });
}

const forOthers = (type) => {
    const items = ref([]);
    axios.get(`${BASE_URL}/v0/${type}.json`).then((response) => {
        let bestStories = response.data.slice(0, 50);
        bestStories.forEach((element) => {
            axios.get(`${BASE_URL}/v0/item/${element}.json`).then((result) => {
                state.incrementor = 10;
                items.value.push(result);
                setDisplayedResults(items.value.slice(0, 20));
                setNewsItems(items.value);
            });
        });
    });
}

//Load more
const loadMore = () => {
    setDisplayedResults(getDisplayedResults().concat(getNewsItems().slice(state.incrementor, state.incrementor + 10)));
    state.incrementor += 10;
}

//Filter by search input
function searchSubmit() {
    let hitsMapped = [];
    axios.get(`http://hn.algolia.com/api/v1/search_by_date?query=${state.searchQuery}`).then((response) => {
        const hits = response.data.hits;
        // Mora da se mapira za da se koristi vo istite templejti (razlicno api).
        hits.forEach((hit) => {
            if (hit.title)
                hitsMapped.push({
                    data: {
                        by: hit.author,
                        descendants: hit.num_comments,
                        id: hit.objectID,
                        kids: [],
                        score: hit.points,
                        time: hit.created_at_i,
                        title: hit.title,
                        type: hit._tags[0],
                        url: hit.url
                    }
                })
        });
        setIsSearched(true);
        setDisplayedResults(hitsMapped);
    });
}

const clearSearch = () => {
    setDisplayedResults(getNewsItems());
    setIsSearched(false);
}

//Filter by time
const filterByTime = (time) => {
    const dayjs = require('dayjs');
    //Se pravi proverka za da se filtrira na prvodobienata niza, ne na veke isfiltrirana
    if (state.filteredByType || state.filteredByTime) setDisplayedResults(getNewsItems());
    state.filteredByTime = true;

    let yesterday = dayjs().subtract('1', 'day').unix();
    let oneWeekAgo = dayjs().subtract('1', 'week').unix();
    let oneMonthAgo = dayjs().subtract('1', "month").unix();
    let oneYearAgo = dayjs().subtract('1', 'year').unix();

    switch (time) {
        case '24':
            setDisplayedResults(getDisplayedResults().filter(item => {
                return item.data.time > yesterday;
            }))
            break;
        case 'week':
            setDisplayedResults(getDisplayedResults().filter(item => {
                return item.data.time > oneWeekAgo;
            }))
            break;
        case 'month':
            setDisplayedResults(getDisplayedResults().filter(item => {
                return item.data.time > oneMonthAgo;
            }))
            break;
        case 'year':
            setDisplayedResults(getDisplayedResults().filter(item => {
                return item.data.time > oneYearAgo;
            }))
            break;
        default:
            console.log('Problem in filterByTime');
    }
}

//Filter by type
const filterByType = (type) => {
    state.filteredByType = true;
    setDisplayedResults(getNewsItems());
    switch (type) {
        case 'story':
            getDisplayedResults();
            break;
        case 'job':
            setDisplayedResults(getDisplayedResults().filter(item => {
                return item.data.type == type;
            }))
            break;
        default:
            console.log('Problem in filterByType');
    }
}

//Filter by score or date
const filterBy = (type) => {
    switch (type) {
        // Se setiraat dvete zasto posle klik na Show More, ostatokot ne bese sortiran.
        case 'score':
            setNewsItems(getNewsItems().sort((a, b) => (a.data.score > b.data.score) ? 1 : -1).reverse())
            setDisplayedResults(getDisplayedResults().sort((a, b) => (a.data.score > b.data.score) ? 1 : -1).reverse())
            break;
        case 'time':
            setNewsItems(getNewsItems().sort((a, b) => (a.data.time > b.data.time) ? 1 : -1).reverse())
            setDisplayedResults(getDisplayedResults().sort((a, b) => (a.data.time > b.data.time) ? 1 : -1).reverse())
            break;
        default:
            console.log('Problem in filterByScore');
    }
}

export default {
    // With readonly(), we prevent our state to be mutated
    // outside of the global.js module
    state: readonly(state),
    setInputValue,
    setNewsItems,
    setDisplayedResults,
    setSearchQuery,
    getNewsItems,
    getDisplayedResults,
    getIsSearched,
    getSearchQuery,
    getArrayOfKids,
    getRenderComments,
    loadMore,
    searchSubmit,
    clearSearch,
    fetchApi,
    forOthers,
    filterByTime,
    filterByType,
    filterBy,
}
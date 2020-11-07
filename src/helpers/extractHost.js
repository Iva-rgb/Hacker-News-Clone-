export const host = URL => {
    if (URL) {
        const host = URL.replace(/^https?:\/\//, "").replace(/\/.*$/, "");
        const parts = host.split(".").slice(-3);
        if (parts[0] === "www") parts.shift();
        return parts.join(".");
    }
}
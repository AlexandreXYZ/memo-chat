type FormatDate = `${string}/${string}/${string} - ${string}:${string}`

export const formatDate = (time: number): FormatDate => {
    const date = new Date(time);
    const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    const month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    const year = date.getFullYear()
    const hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours()
    const minutes = date.getMinutes() < 10
        ? "0" + date.getMinutes()
        : date.getMinutes()

    return `${day}/${month}/${year} - ${hour}:${minutes}`
}
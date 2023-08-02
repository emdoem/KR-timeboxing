function getMinsAndSecsFromSecs (timeInSeconds) {
    const minutes = (timeInSeconds > 0) ? Math.floor(timeInSeconds/60) : 0;
    const seconds = (timeInSeconds > 0) ? Math.floor(timeInSeconds%60) : 0;
    return [minutes, seconds];
}

export {
    getMinsAndSecsFromSecs
};
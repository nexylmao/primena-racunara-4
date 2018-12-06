const colorForFirst = ['red', 'yellow', 'blue', 'pink'];
const colors = ['red', 'yellow', 'green', 'brown', 'blue', 'pink', 'black'];
let series = 0;

const onlyScoring = potted => {
    if (potted.length === 1 && potted[0] === 'red') {
        return true;
    }
    else if (potted.length >= 2 && potted[potted.length - 1] === 'red' && potted[potted.length - 2] !== 'red') {
        return true;
    }
    else {
        return false;
    }
};

const scoreTable = (oldPoints, potted, playing) => {
    let returning = {};
    if (onlyScoring(potted)) {
        colors.forEach((color, index) => {
            if (playing) {
                returning[color] = {
                    playing: true,
                    points: {
                        player: oldPoints.player + (index + 1),
                        opponent: oldPoints.opponent
                    }
                };
            } else {
                returning[color] = {
                    playing: false,
                    points: {
                        player: oldPoints.player,
                        opponent: oldPoints.opponent + (index + 1)
                    }
                };
            }
        });
    } else {
        colors.forEach(color => {
            switch(color) {
                case 'red' :
                    if (playing) {
                        returning[color] = {
                            playing: true,
                            points: {
                                player: oldPoints.player + 1,
                                opponent: oldPoints.opponent
                            }
                        };
                    } else {
                        returning[color] = {
                            playing: false,
                            points: {
                                player: oldPoints.player,
                                opponent: oldPoints.opponent + 1
                            }
                        };
                    }
                    break;
                case 'yellow':
                case 'green':
                case 'brown':
                    if (playing) {
                        returning[color] = {
                            playing: false,
                            points: {
                                player: oldPoints.player,
                                opponent: oldPoints.opponent + 4
                            }
                        };
                    } else {
                        returning[color] = {
                            playing: true,
                            points: {
                                player: oldPoints.player + 4,
                                opponent: oldPoints.opponent
                            }
                        };
                    }
                    break;
                case 'blue':
                    if (playing) {
                        returning[color] = {
                            playing: false,
                            points: {
                                player: oldPoints.player,
                                opponent: oldPoints.opponent + 5
                            }
                        };
                    } else {
                        returning[color] = {
                            playing: true,
                            points: {
                                player: oldPoints.player + 5,
                                opponent: oldPoints.opponent
                            }
                        };
                    }
                    break;
                case 'pink':
                    if (playing) {
                        returning[color] = {
                            playing: false,
                            points: {
                                player: oldPoints.player,
                                opponent: oldPoints.opponent + 6
                            }
                        };
                    } else {
                        returning[color] = {
                            playing: true,
                            points: {
                                player: oldPoints.player + 6,
                                opponent: oldPoints.opponent
                            }
                        };
                    }
                    break;
                case 'black':
                    if (playing) {
                        returning[color] = {
                            playing: false,
                            points: {
                                player: oldPoints.player,
                                opponent: oldPoints.opponent + 7
                            }
                        };
                    } else {
                        returning[color] = {
                            playing: true,
                            points: {
                                player: oldPoints.player + 7,
                                opponent: oldPoints.opponent
                            }
                        };
                    }
                    break;
            }
        });
    }
    return returning;
};

const test = game => {
    console.log(game);
};

const first = game => {
    let currentPoints = game.thirdTurn.points;
    return currentPoints.player - currentPoints.opponent;
};

const second = game => {
    let points = [0, game.firstTurn.points.player, game.secondTurn.points.player, game.thirdTurn.points.player];
    let deltas = [points[1], points[2] - points[1], points[3] - points[2]];
    let countNext = false;
    let score = 0;
    for (i = 0; i < deltas.length; i++) {
        if (deltas[i] === 1 && !countNext) {
            countNext = true;
            score += 5;
        } else {
            if (countNext) {
                score += (Math.pow(2, deltas[i] - 1));
                countNext = false;
            }
        }
    };
    return score;
};

const third = game => {
    let score = 0;
    let reds = 0;
    if (game.thirdTurn.playing === true) {
        score += 100;
        game.potted.forEach(pottedBall => {
            if (pottedBall === 'red') {
                reds++;
            }
        });
        score += reds * 2;
    }
    score += first(game) * 2;
    score += second(game);
    return score;
};

console.clear();

try {
    let count = 0;
    colorForFirst.forEach((color1, firstBranch) => {
        let points1 = {
            player: 0,
            opponent: 0
        };
        let scoreTable1 = scoreTable(points1, [], true);
        colors.forEach((color2, secondBranch) => {
            let points2 = scoreTable1[color1].points;
            let playing2 = scoreTable1[color1].playing;
            let scoreTable2 = scoreTable(points2, [color1], playing2);
            console.log('FirstBranch - ' + (firstBranch + 1));
            console.log(scoreTable1);
            console.log('SecondBranch - ' + (secondBranch + 1));
            console.log(scoreTable2);
            console.log('S' + ++count);
            colors.forEach((color3, thirdBranch) => {
                let points3 = scoreTable2[color2].points;
                let playing3 = scoreTable2[color2].playing;
                console.log((firstBranch + 1) + '-' + (secondBranch + 1) + '-' + (thirdBranch + 1));
                console.log('Playing -> ' + playing3);
                let scoreTable3 = scoreTable(points3, [color1, color2], playing3);
                console.log('potting ' + color3);
                console.log('result : ');
                console.log(scoreTable3[color3]);

                let game = {
                    potted: [color1, color2, color3],
                    firstTurn: scoreTable1[color1],
                    secondTurn: scoreTable2[color2],
                    thirdTurn: scoreTable3[color3]
                }

                test(game);
                console.log('1.');
                console.log(first(game));
                console.log('2.');
                console.log(second(game));
                console.log('3.');
                console.log(third(game));
            });
        }); 
    });
} catch (e) {
    console.error(e);
    console.log('End!');
}
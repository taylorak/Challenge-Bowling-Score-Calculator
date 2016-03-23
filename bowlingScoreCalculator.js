var bowlingScore = function(frameList) {
  return frameList.map(function(frame) {
    var bowlingScores = {
      total: 0,
    }

    Object.keys(frame).forEach(function(key) {
      if(frame.hasOwnProperty(key)) {
        bowlingScores[key] = frame[key]
      }
      bowlingScores['total'] += frame[key];
    })

    return bowlingScores;
  }).reduce(function(prevFrame, currFrame) {
    if(prevFrame.strike) {
      prevFrame.cumulativeScore +=currFrame.roll1 + currFrame.roll2;
    } else if(prevFrame.spare) {
      prevFrame.cumulativeScore += currFrame.roll1;
    }
    prevFrame.cumulativeScore += currFrame.total;

    var newFrame = {}

    newFrame.strike = currFrame.roll1 === 10? true : false;
    newFrame.spare = currFrame.roll1 + currFrame.roll2 === 10? true : false;
    newFrame.cumulativeScore = prevFrame.cumulativeScore;

    return newFrame;

  }, {cumulativeScore: 0, spare: false, strike: false}).cumulativeScore;
}

console.log(bowlingScore([
  {
    roll1: 5,
    roll2: 0
  },
  {
    roll1: 7,
    roll2: 3
  },
  {
    roll1: 5,
    roll2: 5,
    roll3: 6
  }
    ]))
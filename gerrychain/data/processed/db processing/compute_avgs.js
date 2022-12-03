data = {
  polsby_popper_scores: {
    13: 0.19432690858158946,
    5: 0.19067062674558524,
    9: 0.1910019040676945,
    11: 0.19474679038291842,
    3: 0.19223927048638936,
    1: 0.19782707358717835,
    7: 0.19380548309820045,
    8: 0.18817815978929595,
    10: 0.18876796069848611,
    4: 0.1931606377398913,
    6: 0.1920914726160689,
    12: 0.19204738830377388,
    2: 0.19554927755479715,
  },
  rep_splits: {
    13: 0.5125814660232817,
    5: 0.5103613781818735,
    9: 0.4861806041607154,
    11: 0.5027456686396925,
    3: 0.5046322441855339,
    1: 0.5083608253901655,
    7: 0.5054226853637519,
    8: 0.4863233206361688,
    10: 0.4997377356180684,
    4: 0.4933199062986181,
    6: 0.5072917585661555,
    12: 0.498532332964927,
    2: 0.5095016338145861,
  },
  dem_splits: {
    13: 0.4874185339767183,
    5: 0.48963862181812656,
    9: 0.5138193958392846,
    11: 0.4972543313603075,
    3: 0.49536775581446607,
    1: 0.4916391746098345,
    7: 0.49457731463624816,
    8: 0.5136766793638313,
    10: 0.5002622643819317,
    4: 0.5066800937013819,
    6: 0.4927082414338445,
    12: 0.5014676670350731,
    2: 0.49049836618541376,
  },
  black_pop: {
    13: 150790.1762,
    5: 155661.7046,
    9: 162467.0349,
    11: 135145.6957,
    3: 159826.8004,
    1: 164789.5385,
    7: 152337.5889,
    8: 169070.907,
    10: 160503.3271,
    4: 148640.883,
    6: 146309.0663,
    12: 163461.7739,
    2: 150849.5035,
  },
  asian_pop: {
    13: 15212.7748,
    5: 15108.8547,
    9: 16903.3139,
    11: 16386.0296,
    3: 15920.7771,
    1: 14124.7444,
    7: 15477.8413,
    8: 17115.0242,
    10: 16408.1329,
    4: 16752.3103,
    6: 15948.784,
    12: 15913.5728,
    2: 15306.84,
  },
  hispanic_pop: {
    13: 60128.7161,
    5: 61093.9822,
    9: 63869.3935,
    11: 61048.6783,
    3: 61818.9965,
    1: 59842.8484,
    7: 60373.0769,
    8: 64151.0348,
    10: 62373.49,
    4: 62353.378,
    6: 60578.9314,
    12: 62278.0693,
    2: 60209.4046,
  },
  white_pop: {
    13: 487918.2692,
    5: 477147.3566,
    9: 467989.1523,
    11: 499314.5216,
    3: 473810.9511,
    1: 471675.9361,
    7: 482959.4644,
    8: 461763.8328,
    10: 471262.4603,
    4: 485340.2452,
    6: 490345.0727,
    12: 469912.8557,
    2: 484554.882,
  },
  total_pop: {
    13: 733707.5519,
    5: 733541.4822,
    9: 733662.1486,
    11: 732334.7877,
    3: 733971.6023,
    1: 732436.3253,
    7: 733348.4668,
    8: 734005.8849,
    10: 733441.8091,
    4: 733484.129,
    6: 733858.7175,
    12: 734248.1658,
    2: 733441.9289,
  },
  minority_pop: {
    13: 226131.6671,
    5: 231864.5415,
    9: 243239.7423,
    11: 212580.4036,
    3: 237566.574,
    1: 238757.1313,
    7: 228188.5071,
    8: 250336.966,
    10: 239284.95,
    4: 227746.5713,
    6: 222836.7817,
    12: 241653.416,
    2: 226365.7481,
  },
};

function compute_avgs(data) {
  let avgs = {};
  for (let key in data) {
    let sum = 0;
    for (let inner_key in data[key]) {
      sum += data[key][inner_key];
    }
    avgs["avg_" + key] = sum / Object.keys(data[key]).length;
  }
  return avgs;
}

console.log(JSON.stringify(compute_avgs(data)));
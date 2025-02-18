const reforgeButton = document.getElementById('reforgeButton');
reforgeButton.addEventListener("click", reforge);
let lineChartObject = null;

function reforge () {
    // リフォージ回数
    let reforgeCount = 0;

    // 持っている神のオーブ
    const startDiv = Number(document.getElementById('div').value);
    let div = startDiv;
    
    // 持っている金貨
    const startGold = Number(document.getElementById('gold').value);
    let gold = startGold;
    
    // 1神のオーブ当たりのソウルコア数と交換手数料
    const divToSoulcoreRate = Number(document.getElementById('divToSoulcoreRate').value);
    const divToSoulcoreTax = Number(document.getElementById('divToSoulcoreTax').value);
    
    // 1アズカパのソウルコア当たりの神のオーブ数と交換手数料
    const azcapaToDivRate = Number(document.getElementById('azcapaToDivRate').value);
    const azcapaToDivTax = Number(document.getElementById('azcapaToDivTax').value);
    
    // 目標神のオーブ数
    const target =  Number(document.getElementById('target').value);
    
    // 持っている各ソウルコア
    const soulcoreList = {};
    // トポタンテ
    soulcoreList[0] = Number(document.getElementById('topotante').value);
    // タカティ
    soulcoreList[1] = Number(document.getElementById('tacati').value);
    // オピロティ
    soulcoreList[2] = Number(document.getElementById('opiloti').value);
    // ヘクアニ
    soulcoreList[3] = Number(document.getElementById('jiquani').value);
    // ザラトル
    soulcoreList[4] = Number(document.getElementById('zalatl').value);
    // シアクラトル
    soulcoreList[5] = Number(document.getElementById('citaqualotl').value);
    // プフアーテ
    soulcoreList[6] = Number(document.getElementById('puhuarte').value);
    // ザモト
    soulcoreList[7] = Number(document.getElementById('tzamoto').value);
    // ゾペック
    soulcoreList[8] = Number(document.getElementById('xopec').value);
    // クイポラトル
    soulcoreList[9] = Number(document.getElementById('quipolatl').value);
    // ティカバ
    soulcoreList[10] = Number(document.getElementById('ticaba').value);
    // アトモフア
    soulcoreList[11] = Number(document.getElementById('atmohua').value);
    // チョロトル
    soulcoreList[12] = Number(document.getElementById('cholotl').value);
    // ザンティーピ
    soulcoreList[13] = Number(document.getElementById('zantipi').value);
    // アズカパ
    soulcoreList[14] = Number(document.getElementById('azcapa').value);

    // グラフ用設定配列
    let reforgeGraphData = [];
    reforgeGraphData.push(reforgeCount);

    let divGraphData = [];
    divGraphData.push(div);

    // 持っているアズカパを全て換金
    gold = gold - azcapaToDivTax * azcapaToDivRate * soulcoreList[14]; 
    div = div + azcapaToDivRate * soulcoreList[14];
    soulcoreList[14] = 0;

    // 目標金額に到達するか破産するまで実行
    while (div > 0 && div < target && gold > 0 || has3orMoreSoulcore(soulcoreList) != -1) {
        
        // アズカパ以外の3つ以上あるソウルコアを検索
        let soulcoreKey = has3orMoreSoulcore(soulcoreList)
        if (soulcoreKey != -1) {

            // ある場合３個使ってリフォージ
            soulcoreList[soulcoreKey] = soulcoreList[soulcoreKey] - 3;
            reforgeCount++;
            let reforgedSoulcoreKey = Math.floor(Math.random() * 15);

            // アズカパの場合換金、そうでないならストックに追加
            if(reforgedSoulcoreKey == 14) {
                if (gold - azcapaToDivTax * azcapaToDivRate > 0) {
                    gold = gold - azcapaToDivTax * azcapaToDivRate;
                    div = div + azcapaToDivRate;
                } else {
                    if(has3orMoreSoulcore(soulcoreList) == -1) {
                        // 金貨が尽きてソウルコアもないので終了
                        break;
                    }
                }
            } else {
                soulcoreList[reforgedSoulcoreKey] = soulcoreList[reforgedSoulcoreKey] + 1;
            }
            // リフォージ結果をグラフ用に追加
            reforgeGraphData.push(reforgeCount);
            divGraphData.push(div);
        } else {
            // 存在しない場合ソウルコアを購入
            // 全てトポタンテを購入すると仮定
            if(gold - divToSoulcoreTax * divToSoulcoreRate > 0 && div > 0) {
                div = div - 1;
                gold = gold - divToSoulcoreTax * divToSoulcoreRate;
                soulcoreList[0] = soulcoreList[0] + divToSoulcoreRate;
            } else {
                if(has3orMoreSoulcore(soulcoreList) == -1) {
                    // 金貨が尽きて神のオーブもソウルコアもないので終了
                    break;
                }
            }
        }
    }
    // ループを抜けたあとの最後の結果を追加
    reforgeGraphData.push(reforgeCount);
    divGraphData.push(div);

    // 結果表示
    const reforgeCountResult = document.getElementById('reforgeCountResult');
    reforgeCountResult.innerText = reforgeCount;

    const divResult = document.getElementById('divResult');
    divResult.innerText = div;

    const goldResult = document.getElementById('goldResult');
    goldResult.innerText = gold;

    // トポタンテ
    const topotanteResult = document.getElementById('topotanteResult');
    topotanteResult.innerText = soulcoreList["0"];
    // タカティ
    const tacatiResult = document.getElementById('tacatiResult');
    tacatiResult.innerText = soulcoreList["1"]
    // オピロティ
    const opilotiResult = document.getElementById('opilotiResult');
    opilotiResult.innerText = soulcoreList["2"]
    // ヘクアニ
    const jiquaniResult = document.getElementById('jiquaniResult');
    jiquaniResult.innerText = soulcoreList["3"]
    // ザラトル
    const zalatlResult = document.getElementById('zalatlResult');
    zalatlResult.innerText = soulcoreList["4"]
    // シアクラトル
    const citaqualotlResult = document.getElementById('citaqualotlResult');
    citaqualotlResult.innerText = soulcoreList["5"]
    // プフアーテ
    const puhuarteResult = document.getElementById('puhuarteResult');
    puhuarteResult.innerText = soulcoreList["6"]
    // ザモト
    const tzamotoResult = document.getElementById('tzamotoResult');
    tzamotoResult.innerText = soulcoreList["7"]
    // ゾペック
    const xopecResult = document.getElementById('xopecResult');
    xopecResult.innerText = soulcoreList["8"]
    // クイポラトル
    const quipolatlResult = document.getElementById('quipolatlResult');
    quipolatlResult.innerText = soulcoreList["9"]
    // ティカバ
    const ticabaResult = document.getElementById('ticabaResult');
    ticabaResult.innerText = soulcoreList["10"]
    // アトモフア
    const atmohuaResult = document.getElementById('atmohuaResult');
    atmohuaResult.innerText = soulcoreList["11"]
    // チョロトル
    const cholotlResult = document.getElementById('cholotlResult');
    cholotlResult.innerText = soulcoreList["12"]
    // ザンティーピ
    const zantipiResult = document.getElementById('zantipiResult');
    zantipiResult.innerText = soulcoreList["13"]
    // アズカパ
    const azcapaResult = document.getElementById('azcapaResult');
    azcapaResult.innerText = soulcoreList["14"]

    // グラフを描写
    drawChart(reforgeGraphData, divGraphData)
}

// 3つ以上あるソウルコアを検索してそのキー値を返し、存在しない場合-1を返す。
function has3orMoreSoulcore(soulcoreList){
    let key = -1;
    for(let soulcoreKey in soulcoreList) {
        if(soulcoreList[soulcoreKey] >= 3) {
            key = soulcoreKey;
            break;
        }
    }
    return key;
}

// グラフを描写
function drawChart(reforgeGraphData, divGraphData) {
    // グラフの描写先要素を取得
    let lineCtx = document.getElementById("lineChart").getContext('2d');

    // 折れ線グラフの設定
    let lineConfig = {
        type: 'line',
        data: {
            labels: reforgeGraphData,
            datasets: [{
                label: '神のオーブ',
                data: divGraphData
            }],
        },
        options: {
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'リフォージ回数'
                    }
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    };

    // グラフを再描写
    if (lineChartObject) {
        lineChartObject.destroy();
    }
    lineChartObject = new Chart(lineCtx, lineConfig);
}
const reforgeButton = document.getElementById('reforgeButton');
reforgeButton.addEventListener("click", reforge);

function reforge () {
    // 持っている神のオーブ
    const startDiv = document.getElementById('div').value;
    let div = startDiv;
    
    // 持っている金貨
    const startGold = document.getElementById('gold').value;
    let gold = startGold;
    
    // 1神のオーブ当たりのソウルコア数と交換手数料
    const divToSoulcoreRate = document.getElementById('divToSoulcoreRate').value;
    const divToSoulcoreTax = document.getElementById('divToSoulcoreTax').value;
    
    // 1アズカパのソウルコア当たりの神のオーブ数と交換手数料
    const azcapaToDivRate = document.getElementById('azcapaToDivRate').value;
    const azcapaToDivTax = document.getElementById('azcapaToDivTax').value;
    
    // 目標神のオーブ数
    const target =  document.getElementById('target').value;
    
    // 持っている各ソウルコア
    const soulcoreList = {};
    // トポタンテ
    soulcoreList["0"] = document.getElementById('topotante').value;
    // タカティ
    soulcoreList["1"] = document.getElementById('tacati').value;
    // オピロティ
    soulcoreList["2"] = document.getElementById('opiloti').value;
    // ヘクアニ
    soulcoreList["3"] = document.getElementById('jiquani').value;
    // ザラトル
    soulcoreList["4"] = document.getElementById('zalatl').value;
    // シアクラトル
    soulcoreList["5"] = document.getElementById('citaqualotl').value;
    // プフアーテ
    soulcoreList["6"] = document.getElementById('puhuarte').value;
    // ザモト
    soulcoreList["7"] = document.getElementById('tzamoto').value;
    // ゾペック
    soulcoreList["8"] = document.getElementById('xopec').value;
    // クイポラトル
    soulcoreList["9"] = document.getElementById('quipolatl').value;
    // ティカバ
    soulcoreList["10"] = document.getElementById('ticaba').value;
    // アトモフア
    soulcoreList["11"] = document.getElementById('atmohua').value;
    // チョロトル
    soulcoreList["12"] = document.getElementById('cholotl').value;
    // ザンティーピ
    soulcoreList["13"] = document.getElementById('zantipi').value;
    // アズカパ
    soulcoreList["14"] = document.getElementById('azcapa').value;
    
    // 目標金額に到達するか破産するまで実行
    reforge : while (div > 0 && div < target && gold > 0){
        
        for(let soulcoreKey in soulcoreList) {

            // アズカパ以外の3つ以上あるソウルコアを検索
            if (soulcoreKey < 14  && soulcoreList[soulcoreKey] >= 3) {
                
                // ある場合３個使ってリフォージ
                soulcoreList[soulcoreKey] = soulcoreList[soulcoreKey] - 3;
                let reforgedSoulcoreKey = Math.floor(Math.random() * 15);
                
                // アズカパの場合換金、そうでないならストックに追加
                if(reforgedSoulcoreKey == 14) {
                    if(gold - azcapaToDivTax * azcapaToDivRate > 0) {
                        gold = gold - azcapaToDivTax * azcapaToDivRate;
                        div = div + azcapaToDivRate;
                    } else {
                        // ゴールドが尽きたので終了
                        break reforge;
                    }
                } else {
                    soulcoreList[reforgedSoulcoreKey] = soulcoreList[reforgedSoulcoreKey] + 1;
                }
                break;
            }
            
            // 存在しない場合ソウルコアを購入
            if (soulcoreKey >= 14) {
                // 全てトポタンテを購入すると仮定

                if(gold - divToSoulcoreTax * divToSoulcoreRate > 0) {
                    div = div - 1;
                    gold = gold - divToSoulcoreTax * divToSoulcoreRate;
                    soulcoreList["0"] = soulcoreList["0"] + divToSoulcoreRate;
                } else {
                    // ゴールドが尽きたので終了
                    break reforge;
                }
            }
        }
    }

    // 結果表示
    const divResult = document.getElementById('divResult');
    divResult.innerText = div;

    const goldResult = document.getElementById('goldResult');
    goldResult.innerText = gold;

    // トポタンテ
    const topotanteResult = document.getElementById('topotanteResult');
    topotanteResult = soulcoreList["0"];
    // タカティ
    const tacatiResult = document.getElementById('tacatiResult');
    tacatiResult = soulcoreList["1"]
    // オピロティ
    const opilotiResult = document.getElementById('opilotiResult');
    opilotiResult = soulcoreList["2"]
    // ヘクアニ
    const jiquaniResult = document.getElementById('jiquaniResult');
    jiquaniResult = soulcoreList["3"]
    // ザラトル
    const zalatlResult = document.getElementById('zalatlResult');
    zalatlResult = soulcoreList["4"]
    // シアクラトル
    const citaqualotlResult = document.getElementById('citaqualotlResult');
    citaqualotlResult = soulcoreList["5"]
    // プフアーテ
    const puhuarteResult = document.getElementById('puhuarteResult');
    puhuarteResult = soulcoreList["6"]
    // ザモト
    const tzamotoResult = document.getElementById('tzamotoResult');
    tzamotoResult = soulcoreList["7"]
    // ゾペック
    const xopecResult = document.getElementById('xopecResult');
    xopecResult = soulcoreList["8"]
    // クイポラトル
    const quipolatlResult = document.getElementById('quipolatlResult');
    quipolatlResult = soulcoreList["9"]
    // ティカバ
    const ticabaResult = document.getElementById('ticabaResult');
    ticabaResult = soulcoreList["10"]
    // アトモフア
    const atmohuaResult = document.getElementById('atmohuaResult');
    atmohuaResult = soulcoreList["11"]
    // チョロトル
    const cholotlResult = document.getElementById('cholotlResult');
    cholotlResult = soulcoreList["12"]
    // ザンティーピ
    const zantipiResult = document.getElementById('zantipiResult');
    zantipiResult = soulcoreList["13"]
    // アズカパ
    const azcapaResult = document.getElementById('azcapaResult');
    azcapaResult = soulcoreList["14"]
}

// 初始化地圖
var map = L.map('map', { zoomControl: false, worldCopyJump: true }).setView([25.079, 121.234], 4);

L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: 'EVA AIR Virtual'
}).addTo(map);

const TPE_COORDS = [25.0797, 121.2342];

let FlightID;

const evaRoutes = [
    // --- 東南亞地區 ---
    { id: "BR211", to: "曼谷 (BKK/VTBS)", coords: [13.69, 100.75], ac: "Boeing 777-300ER", hr: 3, min: 48, icao: "VTBS" },
    { id: "BR255", to: "峇里島 (DPS/WADD)", coords: [-8.74, 115.16], ac: "Airbus A330-300", hr: 5, min: 18, icao: "WADD" },
    { id: "BR281", to: "宿霧 (CEB/RPVM)", coords: [10.30, 123.97], ac: "Airbus A330-300", hr: 2, min: 55, icao: "RPVM" },
    { id: "BR271", to: "馬尼拉 (MNL/RPLL)", coords: [14.50, 121.01], ac: "Boeing 777-300ER", hr: 2, min: 35, icao: "RPLL" },
    //{ id: "BR231", to: "泗水 (SUB/WARR)", coords: [-7.37, 112.78], ac: "Airbus A330-300", hr: 5, min: 30, icao: "WARR" },
    { id: "BR237", to: "印尼雅加達 (CGK/WIII)", coords: [-6.12, 106.65], ac: "Boeing 787-9", hr: 4, min: 20, icao: "WIII" },
    { id: "BR227", to: "馬來西亞吉隆坡 (KUL/WMKK)", coords: [2.74, 101.70], ac: "Boeing 777-300ER", hr: 4, min: 55, icao: "WMKK" },
    { id: "BR225", to: "新加坡 (SIN/WSSS)", coords: [1.36, 103.99], ac: "Boeing 777-300ER", hr: 4, min: 40, icao: "WSSS" },
    { id: "BR265", to: "柬埔寨金邊 (PNH/VDPP)", coords: [11.54, 104.84], ac: "Airbus A330-300", hr: 3, min: 30, icao: "VDPP" },
    { id: "BR391", to: "越南胡志明市 (SGN/VVTS)", coords: [10.81, 106.65], ac: "Boeing 777-300ER", hr: 3, min: 0, icao: "VVTS" },
    { id: "BR397", to: "越南河內 (HAN/VVNB)", coords: [21.22, 105.80], ac: "Boeing 777-300ER", hr: 3, min: 0, icao: "VVNB" },
    { id: "BR257", to: "清邁 (CNX/VTCC)", coords: [18.77, 98.96], ac: "Airbus A321", hr: 3, min: 30, icao: "VTCC" },
    { id: "BR383", to: "越南峴港 (DAD/VVDN)", coords: [16.04, 108.19], ac: "Airbus A321", hr: 2, min: 40, icao: "VVDN" },

    // --- 日韓地區 ---
    { id: "BR198", to: "東京成田 (NRT/RJAA)", coords: [35.77, 140.39], ac: "Boeing 787-10", hr: 3, min: 0, icao: "RJAA" },
    //{ id: "BR192", to: "東京羽田 (HND/RJTT)", coords: [35.54, 139.77], ac: "Airbus A330-300", hr: 3, min: 0, icao: "RJTT" },
    { id: "BR178", to: "大阪關西 (KIX/RJBB)", coords: [34.43, 135.23], ac: "Boeing 787-10", hr: 2, min: 30, icao: "RJBB" },
    { id: "BR106", to: "福岡 (FUK/RJFF)", coords: [33.58, 130.45], ac: "Boeing 787-9 or 787-10", hr: 2, min: 0, icao: "RJFF" },
    { id: "BR116", to: "札幌 (CTS/RJCC)", coords: [42.77, 141.68], ac: "Boeing 787-10", hr: 3, min: 30, icao: "RJCC" },
    { id: "BR158", to: "小松 (KMQ/RJNK)", coords: [36.39, 136.40], ac: "Airbus A321", hr: 2, min: 30, icao: "RJNK" },
    { id: "BR118", to: "仙台 (SDJ/RJSS)", coords: [38.13, 140.91], ac: "Airbus A330-300", hr: 3, min: 0, icao: "RJSS" },
    { id: "BR186", to: "沖繩 (OKA/ROAH)", coords: [26.20, 127.64], ac: "Airbus A321", hr: 1, min: 30, icao: "ROAH" },
    { id: "BR160", to: "首爾仁川 (ICN/RKSI)", coords: [37.46, 126.44], ac: "Boeing 777W or 787-9 or 787-10", hr: 2, min: 30, icao: "RKSI" },
    { id: "BR170", to: "首爾金浦 (GMP/RKSS)", coords: [37.55, 126.79], ac: "Airbus A330-300 or A321", hr: 2, min: 10, icao: "RKSS" },

    // --- 港澳及中國大陸 ---
    { id: "BR867", to: "香港 (HKG/VHHH)", coords: [22.30, 113.91], ac: "Airbus A330-300 or Boeing 787-9", hr: 1, min: 40, icao: "VHHH" },
    { id: "BR801", to: "澳門 (MFM/VMMC)", coords: [22.15, 113.59], ac: "Airbus A330-300", hr: 1, min: 40, icao: "VMMC" },
    { id: "BR712", to: "上海浦東 (PVG/ZSPD)", coords: [31.14, 121.80], ac: "Boeing 777W or 787-9", hr: 2, min: 0, icao: "ZSPD" },
    //{ id: "BR772", to: "上海虹橋 (SHA/ZSSS)", coords: [31.19, 121.33], ac: "Airbus A330-300", hr: 1, min: 48, icao: "ZSSS" },
    { id: "BR716", to: "北京 (PEK/ZBAA)", coords: [40.07, 116.58], ac: "Airbus A330-300", hr: 3, min: 10, icao: "ZBAA" },
    { id: "BR765", to: "成都 (TFU/ZUTF)", coords: [30.31, 104.44], ac: "Airbus A330-300 or Boeing 787-9", hr: 3, min: 30, icao: "ZUTF" },
    { id: "BR706", to: "廣州 (CAN/ZGGG)", coords: [23.39, 113.29], ac: "Airbus A321", hr: 2, min: 0, icao: "ZGGG" },
    { id: "BR758", to: "杭州 (HGH/ZSHC)", coords: [30.22, 120.43], ac: "Airbus A330-300 or Boeing 787-10", hr: 2, min: 0, icao: "ZSHC" },
    //{ id: "BR728", to: "深圳 (SZX/ZGSZ)", coords: [22.63, 113.81], ac: "Airbus A321", hr: 2, min: 0, icao: "ZGSZ" },

    // --- 北美地區 ---
    { id: "BR12", to: "洛杉磯 (LAX/KLAX)", coords: [33.94, 241.60], ac: "Boeing 777-300ER", hr: 12, min: 0, icao: "KLAX" },
    { id: "BR28", to: "舊金山 (SFO/KSFO)", coords: [37.62, 237.63], ac: "Boeing 777-300ER", hr: 11, min: 30, icao: "KSFO" },
    { id: "BR26", to: "西雅圖 (SEA/KSEA)", coords: [47.45, 237.70], ac: "Boeing 787-10", hr: 11, min: 0, icao: "KSEA" },
    { id: "BR32", to: "紐約 (JFK/KJFK)", coords: [40.64, 286.23], ac: "Boeing 777-300ER", hr: 15, min: 0, icao: "KJFK" },
    { id: "BR52", to: "休士頓 (IAH/KIAH)", coords: [29.98, 264.67], ac: "Boeing 777-300ER", hr: 14, min: 30, icao: "KIAH" },
    { id: "BR36", to: "多倫多 (YYZ/CYYZ)", coords: [43.67, 280.38], ac: "Boeing 777-300ER", hr: 14, min: 0, icao: "CYYZ" },
    { id: "BR10", to: "溫哥華 (YVR/CYVR)", coords: [49.19, 236.82], ac: "Boeing 777-300ER", hr: 10, min: 30, icao: "CYVR" },
    { id: "BR56", to: "芝加哥 (ORD/KORD)", coords: [41.97, 272.10], ac: "Boeing 777-300ER", hr: 14, min: 0, icao: "KORD" },

    // --- 歐洲地區 ---
    //{ id: "BR67", to: "倫敦希斯洛 (LHR/EGLL)", coords: [51.47, -0.45], ac: "Boeing 777-300ER", hr: 14, min: 30, icao: "EGLL" },
    { id: "BR87", to: "巴黎 (CDG/LFPG)", coords: [49.00, 2.54], ac: "Boeing 777-300ER", hr: 15, min: 30, icao: "LFPG" },
    { id: "BR71", to: "慕尼黑 (MUC/EDDM)", coords: [48.35, 11.77], ac: "Boeing 787-9", hr: 14, min: 30, icao: "EDDM" },
    //{ id: "BR61", to: "維也納 (VIE/LOWW)", coords: [48.11, 16.56], ac: "Boeing 787-10", hr: 12, min: 30, icao: "LOWW" },
    //{ id: "BR75", to: "阿姆斯特丹 (AMS/EHAM)", coords: [52.31, 4.76], ac: "Boeing 777-300ER", hr: 13, min: 30, icao: "EHAM" },
    { id: "BR65", to: "維也納(VIE/LOWW)", coords: [48.11, 16.56], ac: "Boeing 787-9", hr: 15, min: 0, icao: "LOWW" },
    { id: "BR95", to: "米蘭 (MXP/LIMC)", coords: [45.63, 8.72], ac: "Boeing 787-9", hr: 14, min: 30, icao: "LIMC" },

    // --- 大洋洲 ---
    { id: "BR315", to: "布里斯本 (BNE/YBBN)", coords: [-27.38, 153.12], ac: "Boeing 787-9 or 787-10", hr: 8, min: 30, icao: "YBBN" }
];

const markerStyle = {
    radius: 6,
    fillColor: "#00592D",
    color: "#fff",
    weight: 2,
    fillOpacity: 1
};

// 初始化畫出所有航線
function drawAllRoutes() {
    L.circleMarker(TPE_COORDS, { ...markerStyle, radius: 10, fillColor: "#A2915A" })
        .addTo(map)
        .bindPopup("<b>RCTP 長榮航空總部</b>");

    evaRoutes.forEach(route => {
        L.polyline([TPE_COORDS, route.coords], {
            color: '#00592D',
            weight: 1.5,
            opacity: 0.2,
            dashArray: '5, 5'
        }).addTo(map);

        L.circleMarker(route.coords, markerStyle)
            .addTo(map)
            .bindPopup(`<b>${route.id}</b> | ${route.icao}<br>往 ${route.to}`);
    });
}

drawAllRoutes();

let activeHighlight = null;
let lastFlightID = null;

function generateRandomFlight() {
    const selectedAC = document.getElementById('select-ac').value;
    const selectedDur = document.getElementById('select-duration').value;

    // --- 修正後的篩選邏輯：改用總分鐘數 ---
    let filteredRoutes = evaRoutes.filter(route => {
        const matchAC = (selectedAC === "ALL" || route.ac === selectedAC);
        
        const totalMinutes = (route.hr * 60) + route.min;
        let matchDur = true;
        
        if (selectedDur === "SHORT") matchDur = (totalMinutes < 240); // 4小時內
        else if (selectedDur === "MED") matchDur = (totalMinutes >= 240 && totalMinutes < 480); // 4-8小時
        else if (selectedDur === "LONG") matchDur = (totalMinutes >= 480); // 8小時以上

        return matchAC && matchDur;
    });

    if (filteredRoutes.length === 0) {
        alert("目前條件下沒有航班，請重新選擇！");
        return;
    }

    let flight;
    if (filteredRoutes.length > 1) {
        do {
            flight = filteredRoutes[Math.floor(Math.random() * filteredRoutes.length)];
        } while (flight.id === lastFlightID);
    } else {
        flight = filteredRoutes[0];
    }

    lastFlightID = flight.id;

    // 格式化為 HH:MM
    const formattedTime = `${flight.hr.toString().padStart(2, '0')}:${flight.min.toString().padStart(2, '0')}`;

    // 更新 UI 文字
    document.getElementById('flightradar').style.display = 'block';
    document.getElementById('result-ui').style.display = 'block';
    document.getElementById('dest-name').innerText = flight.to;
    document.getElementById('flight-detail').innerHTML = `
        航班: <b>${flight.id}</b> | ICAO: <b>${flight.icao}</b><br>
        機型: ${flight.ac}<br>
        預估航程: <span style="font-family: monospace; font-weight: bold; background: #eee; padding: 2px 5px;">${formattedTime}</span>
    `;

    FlightID = flight.id;

    // 航線高亮效果
    if (activeHighlight) map.removeLayer(activeHighlight);
    activeHighlight = L.polyline([TPE_COORDS, flight.coords], {
        color: '#A2915A',
        weight: 5,
        opacity: 0.9
    }).addTo(map);

    const isMob = window.innerWidth <= 768;

    map.fitBounds(activeHighlight.getBounds(), {
        // [上, 右, 下, 左]
        // 下方給 450 像素的留白，會強迫地圖把座標推到畫面最上方
        paddingBottomRight: isMob ? [0, 450] : [50, 50],
        paddingTopLeft: isMob ? [0, 50] : [50, 100],
        maxZoom: 5,
        animate: true
    });

    // 彈出視窗
    L.popup()
        .setLatLng(flight.coords)
        .setContent(`
            <div style="text-align:center">
                <b style="color:#00592D; font-size:14px;">${flight.id}</b><br>
                <b>${flight.icao}</b><br>
                時間: ${formattedTime}
            </div>`)
        .openOn(map);

    document.getElementById('result-ui').style.display = 'block';
}

function openNewWindow() {
    const flightid = FlightID;
    const url = `https://www.flightradar24.com/data/flights/${flightid}`;

    window.open(url, '_blank');
}

function closeResultPanel() {
    // 1. 隱藏 UI 面板
    document.getElementById('result-ui').style.display = 'none';
    document.getElementById('flightradar').style.display = 'none';
    // 2. 移除地圖上的高亮線條 (如果 activeHighlight 是全域變數)
    if (activeHighlight) {
        map.removeLayer(activeHighlight);
        activeHighlight = null; // 清空變數
    }

    // 3. 讓地圖回到初始視角 (可選)
    map.setView([25.079, 121.234], 4);

    map.closePopup();

}

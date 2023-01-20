let bucket;
let filter = [];

let direction = `<div class="filter direction">degree</div>`
let speed = `<div class="filter speed">metersecond</div>
<div class="filter speed">metricoid</div>`

const buckets = document.querySelectorAll(".bucket");
const buckets__block = document.querySelector(".bucket__items");

const fliter__block = document.querySelectorAll(".filter__items");

for (let i = 1; i < fliter__block.length; i++) {
    fliter__block[i].innerHTML = ``;
}

buckets__block.addEventListener("click", (e) => {
    for (let i = 0; i < buckets.length; i++) {
        buckets[i].classList.remove("active__submit");
    }
    e.target.classList.add("active__submit");
    bucket = e.target.innerHTML;

    switch (bucket) {
        case "RoadMeteo":
            fliter__block[0].innerHTML = `
                <div class="filter">direction</div>
                <div class="filter">speed</div> `;
            break;
        case "CO2":
            fliter__block[0].innerHTML = `
                <div class="filter">ammonia (nh3)</div>
                <div class="filter">carbon dioxide (co2)</div>
                <div class="filter">carbon monoxide (co)</div>
                <div class="filter">ozone (o3)</div>`;
            break;
        case "Dessmon":
            fliter__block[0].innerHTML = `
                <div class="filter">active cam</div>
                <div class="filter">anpr</div>`;
            break;
    }

    for (let i = 1; i < fliter__block.length; i++) {
        fliter__block[i].innerHTML = ``;
    }
})

fliter__block[0].addEventListener('click', (e) => {

    if (e.target.classList.contains("active__submit")) {
        e.target.classList.remove('active__submit');
        switch (e.target.innerHTML) {
            case "direction":
                for (let i = fliter__block[1].childNodes.length - 1; i >= 0; i--) {
                    if (fliter__block[1].childNodes[i].nodeName === "DIV" &&
                        fliter__block[1].childNodes[i].classList.contains("direction")) {
                        fliter__block[1].childNodes[i].remove();
                    }
                }
                break;
            case "speed":
                for (let i = fliter__block[1].childNodes.length - 1; i >= 0; i--) {
                    if (fliter__block[1].childNodes[i].nodeName === "DIV" &&
                        fliter__block[1].childNodes[i].classList.contains("speed")) {
                        fliter__block[1].childNodes[i].remove();
                    }
                }
                break;
        }
    } else {
        e.target.classList.add('active__submit');
        switch (e.target.innerHTML) {
            case "direction":
                fliter__block[1].innerHTML = fliter__block[1].innerHTML + direction;
                break;
            case "speed":
                fliter__block[1].innerHTML = fliter__block[1].innerHTML + speed;
                break;
        }
    }

})

fliter__block[1].addEventListener('click', (e) => {
    e.target.classList.toggle("active__submit");
    if (fliter__block[2].innerHTML === '' ) {
        fliter__block[2].innerHTML = `
        <div class="filter">броварський проспект 2</div>
        <div class="filter">вул. богатирська</div>
        <div class="filter">вул. перемоги</div>
        <div class="filter">міст патона</div>
        <div class="filter">столичне шосе</div>
    `;
    }
})

fliter__block[2].addEventListener('click', (e) => {
    e.target.classList.toggle("active__submit");
});

const time = document.querySelector(".time__item");
const time__values = document.querySelector(".time_values");

time.addEventListener('click', ()=>{
    time.classList.toggle("active");
    time__values.classList.toggle("active");
})

time__values.addEventListener('click', (e)=>{
    const time__items = document.querySelectorAll('.time');
    for(let i=0; i<time__items.length; i++){
        time__items[i].classList.remove('active');
    }
    e.target.classList.add("active");
    time__values.classList.toggle("active");
    time.classList.toggle("active");
    time.innerHTML = e.target.innerHTML;
})

const submit = document.querySelector(".btn__submit");
submit.addEventListener("click", (e)=>{
    const items__filter = document.querySelectorAll('.active__submit');
    for(let i=0; i<items__filter.length; i++){
        filter[i] = items__filter[i].innerHTML;
        console.log(filter[i]);
    }
    console.log("------------------------------");

    fetch("")
        .then(response =>{
            return response.json;
        })  
        .then (data => {
            console.log(data);
        })
})




const config = { responsive: true };

/*const barChartTrace1 = {
    x: ["Jan", "Feb", "Mar"],
    y: [20, 14, 23],
    name: "SF Zoo",
    type: "bar",
    marker: {
        color: "#ea335d",
    },
};

const barChartTrace2 = {
    x: ["Apr", "Feb", "Mar"],
    y: [20, 14, 23],
    name: "SF Zoo 2",
    type: "bar",
    marker: {
        color: "yellow",
        //opacity: .6,
    },
}

const barChartData = [barChartTrace1, barChartTrace2];

const layout = {
    barmode: "stack",
    paper_bgcolor: "#172042",
    plot_bgcolor: "#172042",
    showlegend: true,
    margin: {
        l: 30,
        r: 30,
        b: 30,
        t: 30,
        pad: 1,
    },
    font: {
        color: "#6b6f8a",
    },
};

Plotly.newPlot("barChart", barChartData, layout, config);*/


//scientificChart

let mas_data_time = [];
let mas_value_high = [];
let mas_value_low = [];
let mas_value_close = [];

fetch("../data.json")
    .then((response) => {
        return response.json();
    }).then(data => {
        for (let key = 0; key < data.length; key++) {
            mas_data_time[key] = data[key].Date;
            mas_value_high[key] = data[key]["AAPL.High"];
            mas_value_low[key] = data[key]["AAPL.Low"];
            mas_value_close[key] = data[key].dn;
        }

        var trace1 = {
            type: "scatter",
            mode: "lines",
            name: "AAPL High",
            x: mas_data_time,
            y: mas_value_high,
            line: {
                color: "red",
            }
        };

        var trace2 = {
            type: "scatter",
            mode: "lines",
            name: "AAPL Low",
            x: mas_data_time,
            y: mas_value_low,
            line: {
                color: "#03dcee",
            }
        };

        var trace3 = {
            type: "scatter",
            mode: "lines",
            name: "AAPL Dn",
            x: mas_data_time,
            y: mas_value_close,
            line: {
                color: "yellow",
            }
        };

        var data = [trace1, trace2, trace3];

        const layout = {
            paper_bgcolor: "#172042",
            plot_bgcolor: "#172042",
            showlegend: true,
            margin: {
                l: 40,
                r: 30,
                b: 30,
                t: 30,
                pad: 1,
            },
            font: {
                color: "#6b6f8a",
            },
            xaxis: {
                range: ["2016-01-01", "2017-02-01"],
                type: "date",
            },
            yaxis: {
                autorange: true,
                type: "linear",
            },
        };
        Plotly.newPlot("scientificChart", data, layout);

    })
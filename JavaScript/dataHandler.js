// 
function parse(data) {
    const lines = data.split("\n");

}

//
async function getData(filepath) {
    const response = fetch(filepath)
        .then(response => response.text())
        .then(data => parse(data));

    return response;
}

async function main() {
    var crimes = await getData("../Crime_Responses.csv");
    console.log(crimes);
}

main()
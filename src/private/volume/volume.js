let title = document.getElementById("title");
let container = document.getElementById("container");
let author = document.getElementById("author");

let bookid;

fetch(window.location.pathname,{method : "POST"}).then((response) =>{
    if(response.status === 200){
        response.json().then((body)=>{
            bookid = body.bookid;
            title.textContent = body.bookinfo.bookname;
            author.textContent = body.bookinfo.author;

            let volumes = body.volumes;
            let sortedKeys = sortDict(volumes);
            let sortedVolumes = sortDictAry(sortedKeys, volumes);

            let volumeInd = 1;

            sortedKeys.forEach( volName => {
                container.appendChild( displayArcLinks(volName, sortedVolumes[volName], volumeInd) );
                volumeInd++;
            })
        })
    }else{
        title.textContent = "FAILED"
    }
})

function sortDict(dict){
    let ary = Object.keys(dict);
    return naturalSort(ary);
}

function naturalSort(ary){
    // https://stackoverflow.com/questions/2802341/javascript-natural-sort-of-alphanumerical-strings
    let collator = new Intl.Collator(undefined, {numeric: true, sensitivity: 'base'});
    return ary.sort(collator.compare);
}

function sortDictAry(ary, dict){
    let sortedDict = {}
    ary.forEach(element => {
        sortDict[element] = naturalSort(dict[element]);
    });
    return sortDict;
}

function displayArcLinks(title, arcs, volumeInd){
    let volumeDiv = document.createElement("div");
    let volTitle = document.createElement("span");
    volTitle.textContent = folderToName(title);
    volumeDiv.appendChild(volTitle);
    let arcInd = 1;

    arcs.forEach(arc => {
        let arcAnchor = document.createElement("a");
        arcAnchor.textContent = txtFileToName(arc);
        arcAnchor.href = `/book/${bookid}/${volumeInd}/${arcInd}`
        volumeDiv.append(arcAnchor);
        arcInd ++;
    });
    return volumeDiv;
}

function folderToName(folder){
    return folder.substring(folder.indexOf("-") + 1);
}

function txtFileToName(txt){
    return txt.substring(txt.indexOf("-") + 1).replace(".txt", "").replaceAll("_", " ");
}
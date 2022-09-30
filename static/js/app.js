console.log('this is app.js')

// Define a global variable to hold the URL
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// Creating function for plotting a bargraph
function DrawBargraph(sampleId)
{
    console.log(`DrawBargraph(${sampleId})`);
    d3.json(url).then(data =>{

        let samples = data.samples;
        let resultArray = samples.filter(s => s.id == sampleId);
        let result = resultArray[0];

        let otu_ids = result.otu_ids;
        let otu_labels = result.otu_labels;
        let sample_values = result.sample_values;

        let yticks = otu_ids.slice(0, 10).map(otuId => `OTU ${otuId}`).reverse();

        // Create a trace object

        let barData = {
            x : sample_values.slice(0,10).reverse(),
            y : yticks,
            type: 'bar',
            text: otu_labels.slice(0,10).reverse(),
            orientation: 'h'

        };

        // Put the trace object into an array 
        let barArray = [barData];

        // Create a layout object
        let barLayout = {
            title: "Top 10 bacteria cultures found"
        }
         
        // Add plotly

        Plotly.newPlot("bar", barArray, barLayout);

    });

}


// Creating function for plotting a bubble chart
function BubbleChart(sampleId)
{
    console.log(`BubbleChart(${sampleId})`)
    d3.json(url).then(data => {

        let samples = data.samples;
        let resultArray = samples.filter(s => s.id == sampleId);
        let result = resultArray[0];

        let otu_ids = result.otu_ids;
        let otu_labels = result.otu_labels;
        let sample_values = result.sample_values;


        // Create a trace object
        let bubbleData = {
            x:otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
            },
            color: "earth"
        };
       

        // Put the trace object into an array 
       let bubbleArray = [bubbleData];
        // Create a layout object
       let bubbleLayout = {
        title: "Bacteria Cultures per Sample",
        width: 1200,
        height: 500


       };
        // Add plotly

        Plotly.newPlot("bubble", bubbleArray, bubbleLayout);





    })







}


// Creating function for setting the MetaData table
function ShowMetaData(sampleId)
{
    console.log(`ShowMetaData(${sampleId})`);

    d3.json(url).then(data => {

        let metadata = data.metadata;
        let resultArray = metadata.filter(m => m.id == sampleId);
        let result = resultArray[0];

        console.log(resultArray);

        let id = result.id;
        let ethnicity = result.ethnicity;
        let gender = result.gender;
        let age = result.age;
        let location = result.location;
        let bbtype = result.bbtype;
        let wfreq = result.wfreq;

        console.log(id)

        let metadataData = {type: 'table', domain:{x:['id','ethincity','gender','age','location','bbtype','wfreq'], y:[id,ethnicity,gender,age,location,bbtype,wfreq]}}

        let metadataDataArray = [metadataData]

        let metadatalayout = {height:500}

        Plotly.newPlot("sample-metadata",metadataDataArray, metadatalayout)

   });

};


// Creating function for creating the GaugeChart
function GaugeChart(sampleId)
{

    d3.json(url).then(data => {

        let metadata = data.metadata;
        let resultArray = metadata.filter(m => m.id == sampleId);
        let result = resultArray[0];

        let wfreq = result.wfreq;

        // Create Trace Object
        let GaugeData = {
            value : wfreq, domain: {x:(0,9)}, gauge:{axis : {range: [0,9], tickwidth: 2, tickcolor: "darkblue" }, bar: { color: "purple" }
            ,steps: [
                { range: [0, 1], color: "lavender" },
                { range: [3, 4], color: "lightsteelblue" },
                { range: [1, 2], color: "skyblue" },
                { range: [2, 3], color: "lightskyblue" },
                { range: [4, 5], color: "steelblue" },
                { range: [5, 6], color: "cornflowerblue" },
                { range: [6, 7], color: "royalblue" },
                { range: [7, 8], color: "mediumblue" },
                { range: [8, 9], color: "navy" },
              ],}, type: "indicator",
		    mode: "gauge+number", title:{text:"Wash per Week"}};

        // Put the trace object into an array 
        let GaugeDataArray = [GaugeData];

        // Create a layout object
        let GaugeLayout = {
            title:{text: "Belly Button Washing Frequency", font:{size: 30}},
            color : 'blue',
            width: 600, height: 500
        };

        // Add plotly
        Plotly.newPlot("gauge", GaugeDataArray, GaugeLayout);


    });
}
// Creating an event handler for when the value
function optionChanged(sampleId)
{
    console.log(`optionchanged ${sampleId}`);
    DrawBargraph(sampleId);
    BubbleChart(sampleId);
    ShowMetaData(sampleId);
    GaugeChart(sampleId);
}


function InitDashboard()
{
    console.log('InitDashboard()')

    // Get a handle to the dropdown
    let selector = d3.select("#selDataset");

    
    d3.json(url).then(data => {console.log (data);
        let sampleNames = data.names;

        // Populate the dropdown box
        for (let i = 0; i < sampleNames.length; i++){

            let sampleId = sampleNames[i];
            // console.log(`sampleID = ${sampleId}`)
            selector.append("option").text(sampleId).property("value",sampleId);

        }

        // Read the current value from the dropdown
        let initialId = selector.property("value");
        console.log(`initialId = ${initialId}`)

        DrawBargraph(initialId);

        BubbleChart(initialId);

        ShowMetaData(initialId);

        GaugeChart(initialId);
    
    
    }
    
    
    );



}

InitDashboard ();
console.log('this is app.js')

// Define a global variable to hold the URL
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"


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
            }
        };
       

        // Put the trace object into an array 
       let bubbleArray = [bubbleData];
        // Create a layout object
       let bubbleLayout = {
        title: "Bacteria Cultures per Sample"


       };
        // Add plotly

        Plotly.newPlot("bubble", bubbleArray, bubbleLayout);





    })







}

function ShowMetaData(sampleId)
{
    console.log(`ShowMetaData(${sampleId})`)

   
}


// Creating an event handler for when the value
function optionChanged(sampleId)
{
    console.log(`optionchanged ${sampleId}`);
    DrawBargraph(sampleId);
    BubbleChart(sampleId);
    ShowMetaData(sampleId);
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
            console.log(`sampleID = ${sampleId}`)
            selector.append("option").text(sampleId).property("value",sampleId);

        }

        // Read the current value from the dropdown
        let initialId = selector.property("value");
        console.log(`initialId = ${initialId}`)

        DrawBargraph(initialId);

        BubbleChart(initialId);

        ShowMetaData(initialId);
    
    
    }
    
    
    );



}

InitDashboard ();
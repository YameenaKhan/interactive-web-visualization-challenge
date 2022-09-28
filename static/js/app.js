console.log('this is app.js')

function DrawBargraph(sampleId)
{
    console.log(`DrawBargraph(${sampleId})`);
}

function BubbleChart(sampleId)
{
    console.log(`BubbleChart(${sampleId})`)
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

    let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

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
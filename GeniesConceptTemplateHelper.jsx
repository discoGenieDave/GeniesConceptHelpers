// Define the main function for saving the document and images
// Genies inc. All Rights Reserved.
// Genies Concept Helpers V 1.0
// Define the main function
// Open Photoshop
// Go to File >> Scripts >> Browse
// open this script in the Photoshop
// Press Escape to exit

function createCustomDocument() {
    // Create a new document
    var newDoc = app.documents.add(4096, 1024, 72, "Genies_Concept_0001", NewDocumentMode.RGB);

    // Create layers named Front, Side, 3 Quarter, and Back
    var layerNames = ["3 Quarter", "Back", "Side", "Front"];

    for (var i = 0; i < layerNames.length; i++) {
        var newLayer = newDoc.artLayers.add();
        newLayer.name = layerNames[i];
    }

    // Create vertical guides at every 1024 pixels
    for (var i = 1; i <= 3; i++) {
        var guidePosition = 1024 * i;
        newDoc.guides.add(Direction.VERTICAL, guidePosition);
    }
}




// Define the main function for saving the PNG image
function saveImageAsPNG() {
    var doc = app.activeDocument;

    // Export the entire document as a PNG
    savePNG(doc, "0000_Genie_full_image.png");
}

// Function to save a document as a PNG
function savePNG(document, fileName) {
    var savePath = document.fullName.path;
    var saveFile = new File(savePath + "/" + fileName);

    var saveOptions = new PNGSaveOptions();
    saveOptions.compression = 9;

    document.saveAs(saveFile, saveOptions, true, Extension.LOWERCASE);
}

// Create a dialog window for the buttons UI
var dialog = new Window("dialog", "Genies Concept Helper");
dialog.orientation = "column";

// Create the "Create New Document" button and add it to the dialog
var createButton = dialog.add("button", undefined, "Create New Genie");
createButton.onClick = function() {
    createCustomDocument();
};

// Create the "Save Image as PNG" button and add it to the dialog
var saveButton = dialog.add("button", undefined, "Save Image as PNG");
saveButton.onClick = function() {
    saveImageAsPNG();
};

// Add a label below the buttons
dialog.add("statictext", undefined, "Press ESC to close the window");

// Display the dialog
dialog.center();
dialog.show();

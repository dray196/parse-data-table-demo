var tableToBePopulated = document.querySelector('#bragstable');
// Initialize Parse App when the page load is completed
window.addEventListener('load', function() {
  Parse.initialize(
    'MgENsCtDajnVzHWpgf5lOwMk6lxnTtuEY1QnKW8i', // App ID
    'ygHJcy5cDjv2UPyiI1U5KgtbYlPOV2rOc1kk2NmI'  // JavaScript ID
  );
  Parse.serverURL = "https://parseapi.back4app.com/";
}, false);

var bragResults;

function populateTable() {
  var tableName = "Brags"; // The table whose data is to be read
  var queryObject = new Parse.Query(tableName);
  queryObject.notEqualTo("objectId", "");
  queryObject.find()
             .then(function(results) {
               /*
                  THIS IS THE MOST IMPORTANT SECTION
                  Understand that 'results' is an array of data so we have to loop through it and
                  populate the table with the values obtained
               */
               var serialNumber = 1;
               results.forEach(function (result) {
                 bragResults = results;
                 /*
                 So for every individual result what is happening here is that I create
                 a new ROW and then 5 columns (S/N, Description, Mainimage, PosterId and PosterName )
                 and then I add data to those columns by altering the innerHTML properties
                 It's that simple!!!
                 After creating the rows i add the newly created row to the table before moving to the next createElement
                 I hope you guys Understand this
                 But just know that this code is responsible for populating the table
                 */
                 var tableRow = document.createElement('tr');
                 var serialNumberColumn = document.createElement('td');
                 var descriptionColumn = document.createElement('td');
                 var mainImageColumn = document.createElement('td');
                 var posterIdColumn = document.createElement('td');
                 var posterNameColumn = document.createElement('td');
                 var actionsColumn = document.createElement('td');
                 var viewButton = document.createElement('button');
                 var shareButton = document.createElement('button');
                 var deleteButton = document.createElement('button');
                 serialNumberColumn.innerHTML = serialNumber;
                 descriptionColumn.innerHTML = result.attributes.description;
                 mainImageColumn.innerHTML = result.attributes.mainimage;
                 posterIdColumn.innerHTML = result.attributes.posterid;
                 posterNameColumn.innerHTML = result.attributes.postername;

                 // Setup the functions for the Action Buttons
                 viewButton.classList.add('ui', 'icon', 'button', 'green');
                 viewButton.innerHTML = '<i class="icon eye" data-view-id = "' + (serialNumber - 1) + '"></i>';

                  /* Add the [id] for this current result as an attribute of the view button
                     You know why?
                     Cause we'd need it to be able to know which record a particular view button represents
                     and we can then use this id to know what record we wanna VIEW
                     I hope I haven't succeeded in making the process vague
                  */
                  viewButton.setAttribute('data-view-id', serialNumber - 1);

                 /*
                 The following line is responsible for attaching the viewBragInfo function to every
                 individual VIEW button. recall that the viewBragInfo function was defined in this same document
                 */
                 viewButton.addEventListener('click', viewBragInfo, false);

                 // viewButton.onclick = "viewBragInfo(" + (serialNumber - 1) + ")";
                 shareButton.classList.add('ui', 'icon', 'button', 'blue');
                 shareButton.innerHTML = '<i class="icon share"></i>';
                 deleteButton.classList.add('ui', 'icon', 'button', 'red');
                 deleteButton.innerHTML = '<i class="icon trash"></i>';

                 // Add the action buttons to the Action columns
                 actionsColumn.appendChild(viewButton);
                 actionsColumn.appendChild(shareButton);
                 actionsColumn.appendChild(deleteButton);

                 // Add the columns and rows to the appropriate element
                 tableRow.appendChild(serialNumberColumn);
                 tableRow.appendChild(descriptionColumn);
                 tableRow.appendChild(mainImageColumn);
                 tableRow.appendChild(posterIdColumn);
                 tableRow.appendChild(posterNameColumn);
                 tableRow.appendChild(actionsColumn);
                 tableToBePopulated.appendChild(tableRow);
                 serialNumber++;
               });
             })
             .catch(function (error) {
               console.warn(error);
               alert('An Error Occured!');
             });
}

function viewBragInfo(e) {
  var id = e.target.getAttribute('data-view-id');
  $('#bragMainImage').attr('src', bragResults[id].attributes.mainimage);
  $('#bragDescription').html(bragResults[id].attributes.description);
  $('#bragPosterId').html(bragResults[id].attributes.posterid);
  $('#bragPosterName').html(bragResults[id].attributes.postername);
  $('.ui.modal.view-brag-info').modal('show');
}

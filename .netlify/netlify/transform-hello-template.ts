export default async (request, context) => {
    const url = new URL(request.url);

//Look for the "?method=transform" query parameter
if (url.searchParams.get("method") !== "transform") {
    return;
}

// Get the page content from hello-template that will be served next
const response = await context.next();
const page = await response.text();

//Seach for the placeholder
const regex = /LOCATION_UNKNOWN/i;

// Get the location from the Context Object
const location = `${context.geo.city}, ${context.geo.country.name}`;

//Replace the content with the correct location
const updatedPage = page.replace(regex, location);

// Return the response
return new Response(updatedPage, response);

};
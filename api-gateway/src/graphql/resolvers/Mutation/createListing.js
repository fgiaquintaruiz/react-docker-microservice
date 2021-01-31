import ListingService from "#root/adapters/ListingsService";

const createListingResolver = async (obj, { description, title }, context) => {

    //TODO the cookie is not being added to chrome in production env, workaround pending
    // if (!context.res.locals.userSession) throw new Error("Not logged in!");

    console.log("createListingResolver description: " + description + " title: " + title);
    return await ListingService.createListing({ description, title });
};

export default createListingResolver;
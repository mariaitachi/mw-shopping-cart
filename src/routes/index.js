const shoppingRoute = require("./shopping.route");
const pageRoute = require("./page.route");

module.exports = (app) => {
    shoppingRoute(app);
    pageRoute(app);
}
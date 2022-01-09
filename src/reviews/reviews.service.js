const knex = require("../db/connection");

function update(newReview) {
    return knex("reviews")
    .where({ review_id: newReview.review_id })
    .update(newReview, ["*"])
    .then((createdRecords) => createdRecords[0]);
};


function read(reviewId) {
    return knex("reviews")
    .select("*")
    .where({ review_id: reviewId})
    .first(); 
}


function getCritic(criticId) {
    return knex("critics")
    .select("*")
    .where({ critic_id: criticId})
    .first(); 
}

function destroy(reviewId) {
    return knex("reviews")
    .where({ review_id: reviewId })
    .del();
}

module.exports = {
    update,
    read,
    getCritic, 
    destroy,
}
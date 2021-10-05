const AWS = require("aws-sdk");
const s3 = new AWS.S3();

exports.s3PriceAnalyzer = async (event) => {
  const getObjectRequests = event.Records.map((record) => {
    const params = {
      Bucket: record.s3.bucket.name,
      Key: record.s3.object.key,
    };

    return s3
      .getObject(params)
      .promise()
      .then((data) => {
        // implement code here
        let items = data.Body.toString().split("\n");
        const SplitItems = items.map((item) => item.split(","));
        const filteredItems = SplitItems.filter((itemToFilter) => {
          return itemToFilter[0] === "fruits" && itemToFilter[2] < 10;
        });
        console.log(filteredItems);
      })
      .then((filteredItems) => {
        const response = fetch(
          ``,
          {
            method: "POST",
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      })

      .catch((err) => {
        console.error("Error calling S3 getObject:", err);
        return Promise.reject(err);
      });
  });

  return Promise.all(response).then(() => {
    console.debug("Complete!");
  });
};

const {
    Message,
    Section,
    Divider,
    Actions,
    Button,
    Context,
    Blocks,
    Elements,
    Paginator,
    Modal,
    Img,
} = require("slack-block-builder");

// module.exports = createSlackBlockJson = (rentals) =>
//     Modal({ title: "Open Tasks" })
//         .blocks(
//             Blocks.Section({
//                 text: "New Streeteasy Listing(s) Posted :rotating_light: :rotating_light: :rotating_light:",
//             }),
//             Blocks.Section({
//                 text: `I found *${rentals.length} listing(s)*:`,
//             }),
//             Paginator({
//                 perPage: 3,
//                 items: rentals,
//                 totalItems: rentals.length,
//                 page: 1,
//                 actionId: ({ page, offset }) =>
//                     JSON.stringify({ action: "render-rentals", page, offset }),
//                 blocksForEach: ({ item }) => [
//                     Blocks.Divider(),
//                     Blocks.Section({
//                         type: "mrkdwn",
//                         text: `"*<${item.url}|${item.address}>*\n${item.price} per month"`,
//                     }).accessory(
//                         Img({
//                             imageUrl: item.primaryImage,
//                             altText: "Image",
//                         }),
//                     ),
//                     // Elements.Image({ text: "View Details" })
//                     //     .actionId("view-details")
//                     //     .value(item.url),
//                     Blocks.Section({
//                         text: `*Posted:* Today`,
//                     }),
//                 ],
//             }).getBlocks(),
//         )
//         .close("Done")
//         .buildToJSON();

module.exports = createSlackBlockJson = ({
    address,
    price,
    description,
    primaryImage,
    url,
    neighborhood,
}) => {
    return {
        blocks: [
            {
                type: "section",
                text: {
                    type: "plain_text",
                    emoji: true,
                    text: "There is a new Streeteasy Listing!",
                },
            },
            {
                type: "divider",
            },
            {
                type: "section",
                text: {
                    type: "mrkdwn",
                    text: `*<${url}|${address}>*\n${neighborhood}\n${price} per month`,
                },
                accessory: {
                    type: "image",
                    image_url: primaryImage,
                    alt_text: "image thumbnail",
                },
            },
        ],
    };
};

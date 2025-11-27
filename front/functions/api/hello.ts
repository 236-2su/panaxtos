export const onRequest: PagesFunction = async () => {
    return Response.json({ message: "Hello from Cloudflare Pages Functions!" });
};

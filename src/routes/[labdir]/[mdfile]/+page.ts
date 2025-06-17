import { error } from "@sveltejs/kit";

export async function load({ params }) {
  try {
    // const post = await import("../../../content/api4all/api4everyone.md");
    const post = await import(
      `../../../content/${params.labdir}/${params.mdfile}.md`
    );

    return {
      content: post.default,
      meta: post.metadata,
    };
  } catch (e) {
    error(404, `Could not find ${params.labdir}/${params.mdfile}`);
  }
}

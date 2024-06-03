import TagItem from "./tag";
import { Button, Textarea, Input, Container } from "@medusajs/ui";

const UploadArticleItem = (props) => {

    return (
        <div id="publish-container" className={`slide-parent ${props.show_upload ? "active" : ""}`}>
            <Container className="py-5 mt-4">
                <div className="flex flex-col items-center gap-1">
                    <div className="flex justify-center">
                        <p className="text-center font-light text-xs text-gray-400/80 max-w-sm">Note that these inputs are not mandatory, as their use depends on your frontend</p>
                    </div>
                    <div className="grid grid-cols-2 gap-x-5 gap-y-4 text-sm w-full p-4">
                        <div className="flex flex-col gap-0.5">
                            <label htmlFor="author" className="text-xs text-gray-400 ml-2 font-medium">Author</label>
                            <Input id="author" name="author" type="text" placeholder='Author' />
                        </div>
                        <div className="flex flex-col gap-0.5">
                            <label htmlFor="tags" className="text-xs text-gray-400 ml-2 font-medium">Tags</label>
                            <TagItem />
                        </div>
                        <div className="flex flex-col gap-0.5">
                            <label htmlFor="seo-title" className="text-xs text-gray-400 ml-2 font-medium">SEO title</label>
                            <Input id="seo-title" name="seo-title" placeholder='SEO title' type="text" />
                        </div>
                        <div className="flex flex-col gap-0.5">
                            <label htmlFor="seo-keywords" className="text-xs text-gray-400 ml-2 font-medium">SEO keywords</label>
                            <Input id="seo-keywords" name="seo-keywords" placeholder='SEO keywords' type="text" />
                        </div>
                        <div className="flex flex-col gap-0.5">
                            <label htmlFor="url-slug" className="text-xs text-gray-400 ml-2 font-medium">Url slug</label>
                            <Input id="url-slug" onChange={(event) => event.target.value = slugify(event.target.value)} placeholder='Url slug' type="text" />
                        </div>
                        <div className="flex flex-col gap-0.5">
                            <label htmlFor="seo-description" className="text-xs text-gray-400 ml-2 font-medium">SEO description</label>
                            <Textarea className="max-h-48" id="seo-description" name="seo-description" placeholder='SEO description' ></Textarea>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        {props.draftStatus ? 
                            <Button onClick={() => {
                                props.handleSubmit();
                                props.setDraftStatus(false);
                            }} size="large" className="px-6 py-1.5 mb-0.5">
                                Publish
                            </Button>
                            :
                            <Button onClick={() => {
                                props.handleSubmit();
                                props.setDraftStatus(true);
                            }} size="large" className="px-6 py-1.5 mb-0.5">
                                Become draft
                            </Button>
                        }
                    </div>
                    <div className={props.submitError || props.submitSuccess ? "pt-2 pb-0.5" : ""}>
                        <div className="max-w-xl text-red-500 text-center break-words">
                            <p>{props.submitError}</p>
                        </div>
                        <div className="max-w-xl text-blue-500 text-center break-words">
                            <p>{props.submitSuccess}</p>
                        </div>
                    </div>
                </div>
            </Container>
            <style>
                {
                    `
                        .slide-parent {
                            overflow: hidden; /* Hide overflowing content */
                            height: 0; /* Initially collapse the parent */
                        }
                        .slide-parent.active {
                            height: auto;
                        }
                    `
                }
            </style>
        </div>
    )
}

function slugify(text) {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
}

export default UploadArticleItem;
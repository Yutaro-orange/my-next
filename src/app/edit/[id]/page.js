import BookDetails from "../../../components/BookDetails";
import FormEdit from '@components/FormEdit';
import {getBookById, getReviesById} from '@lib/getter';

export default async function EditPage({params}) {
    const book = await getBookById(params.id);
    const review = await getBookById(params.id)
    const read = (review?.read || new Date()).toLocalDateString('sv-SE');

    return(
        <div id="form">
            <BookDetails book={book} />
            <hr />
            <FormEdit src={{id: book.id, read, memo: review?.memo}} />
        </div>
    );
}
import NewNote from '../components/NewNote'
import newNoteStyles from '../components/NewNote.css'

import { getStoredNotes, storeNotes } from '~/data/notes'
import { v4 as uuidv4 } from 'uuid';
import { redirect } from '@remix-run/node';

export default function NotesPage() {
    return (
        <main>
            <NewNote />
        </main>
    )
}

export async function action({ request }) {
    const formData = await request.formData();
    // const noteData = {
    //     title: formData.get('title'),
    //     content: formData.get('content')
    // }
    // SHORTHAND:
    const noteData = Object.fromEntries(formData);

    // @todo add validation
    const existingNotes = await getStoredNotes();
    noteData.id = uuidv4();
    const updatedNotes = [...existingNotes, noteData];

    await storeNotes(updatedNotes);
    return redirect('/notes');
}

export function links() {
	return [{ rel: 'stylesheet', href: newNoteStyles }];
}

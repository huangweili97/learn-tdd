export default function makeUrl(type: string, id?: string): string {
    const contentUrl = 'http://localhost:8000/';
    
    if (type === 'authors' || type === 'books' || type === 'available') {
        return contentUrl + type;
    }

    if (type === 'book_dtls' && id) {
        return `${contentUrl}${type}?id=${id}`;
    }

    throw new Error('Invalid type or missing id for book_dtls');
}

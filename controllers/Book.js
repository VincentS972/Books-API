const router = require('express').Router()
const Book = require('../models/Book')


router.get('/', async (req, res) => {
    try {
        console.log('Hello World!')
        res.json({ message: 'Hello World!' })
    } catch (error) {
        console.log('error retreiving page', error)
        res.status(404).json({ message: 'error 404' })
    }
})

router.get('/books', async (req, res) => {
    try {
        const books = await Book.find()
        res.json(books)
    } catch (error) {
        console.log('error retreiving books:', error)
        res.json({ message: 'error retreving books' })
    }
})

router.get('/books/:id', async (req, res) => {
    const { id } = req.params
    try {
        const books = await Book.findById(id)
        res.json(books)
    } catch (error) {
        console.log('error retreiving book:', error)
        res.status(404).json({ message: `error retreiving book with id ${id}` })
    }
})

router.post('/books', async (req, res) => {
    try {
        const books = await new Book(req.body).save()
        res.json(books)
    } catch (error) {
        console.log('error creating book:', error)
        res.status(500).json({ message: 'error creating book' })
    }
    
})

router.put('/books/:id', async (req, res) => {
    try {
        const { id } = req.params
        await Book.findByIdAndUpdate(id, req.body)
        console.log('Book updated')
        res.status(303).json({ message: 'Book updated' })
    } catch (error) {
        console.log('error updating book:', error)
        res.status(500).json({ message: 'error updating book' })
    }
})

router.delete('/books/:id', async (req, res) => {
    try {
        const { id } = req.params
        await Book.findByIdAndDelete(id)
        console.log('book succesfully deleted')
        res.status(303).json({ message: 'Book successfully deleted' })
    } catch (error) {
        console.log('error deleting book:', error)
        res.status(500).json({ message: 'error deleting book' })
    }
})

module.exports = router
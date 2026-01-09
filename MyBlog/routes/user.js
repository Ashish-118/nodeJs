const { router } = require('express');

const router = router();


router.get('/signin', (req, res) => {
    return res.render('signin');
})
router.get('/signup', (req, res) => {
    return res.render('signup');
})

router.post('/signup')

module.exports = router;
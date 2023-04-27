//anketlerin için
const express = require('express');
const Surveys = require('../models/Survey');
const checkAuth = require('../middleware/check-auth');
const Results = require('../models/Results')
const router = express.Router();

//anket oluşturma
router.post('/create', checkAuth, (req, res) => {
    let survey = new Surveys({
        ...req.body.survey,
        createdBy: req.body.createdBy,
        questions: req.body.survey.questions.map(ques => {
            return {
                ...ques,
                answers: ques.answers.map(ans => {
                    return {
                        name: ans,
                        selected: false
                    }
                })
            }
        })
    });

    survey.save().then(result => {
        res.status(200).json({ success: true })
    })
});

//kullanıcının kendi oluşturduğu anketler
router.get("/my-surveys/:id", checkAuth, (req, res) => {
    Surveys.find({ createdBy: req.params.id })
        .then(result => {
            res.status(200).json(result);
        })
});

//tüm anketler
router.get('/all-surveys', checkAuth, (req, res) => {
    Surveys.find()
        .then(result => {
            res.status(200).json(result);
        })
});

//anket sonucu kayıt
router.post('/save-results', checkAuth, (req, res) => {
    let result = new Results({
        userId: req.body.currentUser,
        answers: req.body.answers,
        surveyId: req.body.surveyId
    });
    result.save().then(async resp => {
        await Surveys.updateOne({ _id: req.body.surveyId }, {
            $push: {
                results: resp._id
            }
        });
        res.status(200).json({ resultId: resp._id });
    })
});

//anketin sonuclarını getir
router.get('/results/:id', checkAuth, (req, res) => {
    if (!req.params.id) {
        res.status(500).send("id gönderilemedi");
    } else {
        Results.findOne({ _id: req.params.id }).then(data => {
            if (!data) {
                res.status(500).send("hata oluştu");
            } else {
                Surveys.findOne({ _id: data.surveyId }).then(survey => {
                    if (!survey) {
                        res.status(500).send("anket verileri alınamadı");
                    } else {
                        res.status(200).json({ result: data, survey: survey });
                    }
                })
            }
        }).catch((err) => {
            console.log(err);
            res.status(500).send("hata oluştu");
        })
    }
})

//anleti getir
router.get('/get-survey/:id', checkAuth, (req, res) => {
    Surveys.findOne({ _id: req.params.id }).then(survey => {
        res.status(200).json({ survey });
    }).catch(er => {
        res.status(500).send(er);
    })
})

module.exports = router;
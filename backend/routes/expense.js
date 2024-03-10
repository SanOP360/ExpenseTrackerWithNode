const express=require('express');

const userController= require('../controllers/expense');

const router=express.Router();

router.get('/',userController.getExpenses);

router.post('/',userController.postExpense);
router.delete("/:id", userController.deleteExpense);

module.exports=router;
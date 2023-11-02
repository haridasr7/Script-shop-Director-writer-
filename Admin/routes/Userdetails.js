

const express = require('express');
const router = express.Router();
const adminController = require('../controllers/UserdetailsController');

router.get('/view-users/:roles', adminController.viewUsersByRoles);// filter with the roles of director and writer

router.get('/recently-joined-in-users', adminController.getRecentlyRegisteredUsers);// recently joined users with createdAt

router.get('/user-counts', adminController.getUserCounts); //total counts of directors and writers 

router.get('/user-purchased', adminController.getAllScriptDetails);//purchasedusers

router.put('/block/:userId', adminController.blockUser); //block user

router.delete('/remove/:userId', adminController.removeUser);//remove user

router.put('/unblock/:userId', adminController.unblockUser);//unblock user

router.get('/admin/contacts', adminController.getContactDetails);//contactdetails

router.delete('/admin/contactsdelete/:id', adminController.deleteContactById);//deletecontact

router.put("/admin/contacts/:id", adminController.updateReadStatus);//update the read message

router.get('/getblockeduser', adminController.getAllBlockedUsers);//getblockedusers





module.exports = router;

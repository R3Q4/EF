
import EnquiryService from '../service/enquiry.service.js'
class EnquiryController {
    async upload(req, res, next) {

      try{
          const { category, subject, message } = req.body
          const id = req.user.id
          const enquiryId = await EnquiryService.upload({ id, category, subject, message })
          res.status(201).json({ message: "Enquiry added successfully"})

        } catch(err) { next(err) } 

        }
    async retrieve(req, res, next){
      try{
        const user_id = req.user.id
        const enquiries = await EnquiryService.retrieve(user_id)
        res.json(enquiries)
      }
      catch(err){

        res.status(500).json({message: 'EnquiryController - failed to retrieve users enquiries'})
        next(err)
      }
    }
    }
export default new EnquiryController
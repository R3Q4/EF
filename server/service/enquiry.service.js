import pool from '../config/database.js'
import enquiryDAO from '../dao/enquiry.dao.js'

class EnquiryService {
  async upload({ id, category, subject, message}){
    if ( !category || !subject || !message){
      throw new Error('Fields are not filled')
    }
 
    if (message.length < 10 ){
      throw new Error('Message cannot be less than 10 characters')
    }

    await enquiryDAO.create( id, category, subject, message, 'Pending')

  }

    async retrieve(user_id) {
        return await enquiryDAO.retrieve(user_id)
      }
}

export default new EnquiryService()
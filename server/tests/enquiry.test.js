import EnquiryService from '../service/enquiry.service.js'

const valid_user_id = 7

test('Basis Path', async () => {
    const call = async () => await EnquiryService.upload({id: valid_user_id, category:"App Qn", subject:"Username Change", message:"How do I change my username?"})
    await expect(async () => await call()).not.toThrow()
})

test('Path 1', async () => {
    const call = async () => await EnquiryService.upload({id: valid_user_id, category:null, subject:"Username Change", message:"How do I change my username?"})
    await expect(call()).rejects.toThrow('Fields are not filled')
})

test('Path 2', async () => {
    const call = async () => await EnquiryService.upload({id: valid_user_id, category:'App Qn', subject:"Username Change", message:"Blah"})
    await expect(call()).rejects.toThrow('Message cannot be less than 10 characters')
})
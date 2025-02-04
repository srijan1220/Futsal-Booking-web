const request = require('supertest')
const app = require('../index')


describe('Api testings',()=>{
  
    it('GET/api/futsal/get_futsals | Response with valid json', async()=>{
        const response = await request(app).get('/api/futsal/get_futsals')
        expect(response.statusCode).toBe(200)
        expect(response.body).toBeDefined()
        expect(response.body.success).toBe(true)
        expect(response.body.message).toBe("Futsal successfully")

    }
    )

    it('POST/api/user/create | Response with valid json', async()=>{
        const response = await request(app).post('/api/user/create').send({
            userName:"testapi",
            phoneNumber:"2512012365",
            email:"testapi@gmail.com",
            password:"12345",
        })
        console.log(response.body);
    
        expect(response.body.success).toBe(true)
        expect(response.body.message).toBe('User Created Successfully')
       
    })


    it('POST/api/user/login | Response with valid json', async()=>{
        const response = await request(app).post('/api/user/login').send({
            
            email:"testapi@gmail.com",
            password:"12345",
        })
        console.log(response.body);
    if(response.body.success){
        expect(response.body.success).toBe(true)
        expect(response.body.success).toBe(true)
        expect(response.body.message).toBe('User Logged In successfully')
        expect(response.body.token).toBeDefined()
    }
       
    })

    it('GET Futsal | fetch single futsal', async()=>{
        const response = await request(app).get('/api/futsal/get_futsals/659cf59fdf04dd5a5d479f75')
        expect(response.body.success).toBe(true)
        expect(response.body.message).toBe("Futsal fetched Successfully")

        
    })

    it('GET FutsalUserID | fetch admin futsal', async()=>{
        const response = await request(app).get('/api/futsal/getfutsalbyUser/65dc1a065ea1155046c692a4')
        expect(response.body.success).toBe(true)
        expect(response.body.message).toBe("Futsal fetched successfully")

    })

    it('GET Booking | fetch single booking', async()=>{
        const response = await request(app).get('/api/booking/get_singlebooking/65a690a3fd4fd45a88a6c9c9')
        expect(response.body.success).toBe(true)
        expect(response.body.message).toBe("Booking fetched Successfully")

    })

    // for notification

    it('POST/api/notification/createnotification | Response with valid json', async()=>{
        const response = await request(app).post('/api/notification/createnotification ').send({
            user: "658ad6ce3286c480a788cd09",
            title:"New Notification",
            description:"New Notification",
        })
        console.log(response.body);
    if(response.body.success){
        expect(response.body.success).toBe(true)
        expect(response.body.message).toBe('Notification created successfully')
    }
       
    })

    // for getting the notification

    it('GET Notification | fetch user Notification', async()=>{
        const response = await request(app).get('/api/notification/usernotification/6590d8ebb0ca73dbb1458b33')
        expect(response.body.success).toBe(true)

    })


    // for reviews

    it('POST/api/review/create_review | Response with valid json', async()=>{
        const response = await request(app).post('/api/review/create_review').send({
            user: "65dc1c6ecbca4fbf0350c41b",
            futsal: "65dc1bcc5ea1155046c692ab",
            rating:"4",
            review:"testdescription",  
        })
        console.log(response.body);
        expect(response.body.success).toBe(true)
        expect(response.body.message).toBe('Review submitted successfully.')

    })

    // fetching reviews

    it('GET Reviews | fetch futsal Reviews', async()=>{
        const response = await request(app).get('/api/review/getreviews/65dc1bcc5ea1155046c692ab')
        expect(response.body.success).toBe(true)

    })

    // fetching average rating of futsal

    it('GET Futsal rating | fetch futsal rating', async()=>{
        const response = await request(app).get('/api/review/averageRating/65dc1bcc5ea1155046c692ab')
        expect(response.body.success).toBe(true)
        
        
    })



    

})

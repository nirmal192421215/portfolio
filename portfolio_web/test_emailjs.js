const emailjs = require('@emailjs/browser');
// wait, browser library won't work in node easily. Let's do a fetch.
fetch('https://api.emailjs.com/api/v1.0/email/send', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    service_id: 'service_oav3hkh',
    template_id: 'template_yy1bwkt',
    user_id: 'Pa3KjH-MhypG5_676',
    template_params: {
      from_name: 'Test',
      from_email: 'test@test.com',
      message: 'Test message',
      to_name: 'Nirmal'
    }
  })
}).then(r => r.text()).then(console.log).catch(console.error);

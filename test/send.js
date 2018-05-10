/**
 * Created by www.Alga.me on 10/5/18.
 */
import sender from '../src/index';

(async ()=>{
  try {
    const success = await sender({
      to: process.env.TO,
      message: `Test Message ${new Date().toLocaleString()}`,
      provider: 'ClickSend',
    });

    console.log('SUCCESS', success);
  } catch (e) {
    console.log('ERROR', e);
  }

  process.exit();
})();

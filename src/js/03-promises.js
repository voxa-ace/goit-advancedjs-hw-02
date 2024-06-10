document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');

  form.addEventListener('submit', event => {
    event.preventDefault();

    const delay = Number(form.delay.value);
    const step = Number(form.step.value);
    const amount = Number(form.amount.value);

    for (let i = 0; i < amount; i++) {
      const currentDelay = delay + i * step;
      createPromise(i + 1, currentDelay)
        .then(({ position, delay }) => {
          iziToast.success({
            title: 'Success',
            message: `Fulfilled promise ${position} in ${delay}ms`,
          });
        })
        .catch(({ position, delay }) => {
          iziToast.error({
            title: 'Error',
            message: `Rejected promise ${position} in ${delay}ms`,
          });
        });
    }
  });

  function createPromise(position, delay) {
    return new Promise((resolve, reject) => {
      const shouldResolve = Math.random() > 0.3;

      setTimeout(() => {
        if (shouldResolve) {
          resolve({ position, delay });
        } else {
          reject({ position, delay });
        }
      }, delay);
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
    const timeWrapper = document.querySelector('.timeline-inner');
    const shortYear =  0.99659815;
    const dateNow = new Date();
    const dateBorn = new Date('1998-12-13');
    const avgManLife = 67*365.2425*shortYear;
    const avgWomLife = 77*365.2425*shortYear;//77 years
    const fullTime = 80*365.2425*shortYear;//80 years
    const daysLived = Math.floor((dateNow - dateBorn) / (1000 * 60 * 60 * 24))*shortYear;
    const weekBlock = `<div class="week-block"></div>`;
    const timeline = [];


    const getBlocks = count => {
        for(let i = 0; i <= count; i++){
            if(i <= Math.floor(daysLived/7)){
                timeline.push(`<div data-id="${i+1}" class="week-block present-life"></div>`);
                continue;
            } else if(i <= Math.floor(avgManLife/7)){
                timeline.push(`<div data-id="${i+1}" class="week-block perfect-life"></div>`);
                continue;
            } else {
                timeline.push(`<div data-id="${i+1}" class="week-block"></div>`);
            }
        }
        return timeline.join('');
    };

    const renderTimeline = () => {
        timeWrapper.innerHTML = getBlocks(Math.floor(fullTime/7));
    };

    const showPopup = target => {
        target.style.zIndex = 2;
        const popupEl = document.createElement('div');
        popupEl.innerHTML = `${Math.floor(target.dataset.id/52)} years,
                             </br> ${Math.floor(target.dataset.id % 52) || 52} weeks ${target.dataset.id}`
        popupEl.style.top = `${target.offsetTop - 41}px`;
        popupEl.style.left = `${target.offsetLeft - 45}px`;
        popupEl.classList.add('hover');
        target.before(popupEl);
    }

    const deletePopup = target => {
        target.style.zIndex = '0';
        document.querySelectorAll('.hover').forEach(el => el.remove());
    };

    const hoverPopup = event => {
      const target = event.target;
      let time;
      if(target.dataset.id){
          time = setTimeout(() => showPopup(target), 500);
          target.addEventListener('mouseleave', event => {
             deletePopup(target);
             clearTimeout(time);
          });
      }

    };


    timeWrapper.addEventListener('mousemove', hoverPopup);


    renderTimeline();
});
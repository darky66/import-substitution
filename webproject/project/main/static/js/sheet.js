document.addEventListener('DOMContentLoaded', () => {
    // Filters Sheet
    const filtersSheet = document.getElementById('filtersSheet');
    const openFiltersBtn = document.getElementById('openFilters');
    const closeFiltersBtn = document.getElementById('closeFilters');
    const sheetContent = document.querySelector('.filters-sheet-content');

    if (openFiltersBtn) {
        openFiltersBtn.addEventListener('click', () => {
            filtersSheet.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (closeFiltersBtn) {
        closeFiltersBtn.addEventListener('click', () => {
            filtersSheet.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    if (filtersSheet) {
        filtersSheet.addEventListener('click', e => {
            if (e.target === filtersSheet) {
                filtersSheet.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Account Sheet
    const accountSheet = document.getElementById('accountSheet');
    const mobileLoginBtn = document.getElementById('mobileLoginBtn');
    const closeAccountBtn = document.getElementById('closeAccountSheet');

    if (mobileLoginBtn) {
        mobileLoginBtn.addEventListener('click', e => {
            e.preventDefault();
            accountSheet.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (closeAccountBtn) {
        closeAccountBtn.addEventListener('click', () => {
            accountSheet.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    if (accountSheet) {
        accountSheet.addEventListener('click', e => {
            if (e.target === accountSheet) {
                accountSheet.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Touch drag для filtersSheet
    if (sheetContent) {
        let startY = 0, currentY = 0, isDragging = false;
        const CLOSE_THRESHOLD = 120;

        sheetContent.addEventListener('touchstart', e => {
            if (!filtersSheet.classList.contains('active')) return;
            startY = e.touches[0].clientY;
            currentY = startY;
            isDragging = true;
            sheetContent.style.transition = 'none';
        });

        sheetContent.addEventListener('touchmove', e => {
            if (!isDragging) return;
            currentY = e.touches[0].clientY;
            const deltaY = currentY - startY;
            if (deltaY > 0) {
                sheetContent.style.transform = `translateY(${deltaY}px)`;
            }
        });

        sheetContent.addEventListener('touchend', () => {
            if (!isDragging) return;
            isDragging = false;
            sheetContent.style.transition = 'transform 0.25s cubic-bezier(.4,0,.2,1)';
            const deltaY = currentY - startY;

            if (deltaY > CLOSE_THRESHOLD) {
                filtersSheet.classList.remove('active');
                document.body.style.overflow = '';
            } else {
                sheetContent.style.transform = 'translateY(0)';
            }
        });
    }
});

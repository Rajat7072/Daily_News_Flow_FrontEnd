from pathlib import Path
import shutil
import os
root = Path('src')
moves = {
    'SideBar.jsx': 'components/SideBar.jsx',
    'Footer.jsx': 'components/Footer.jsx',
    'Loader.jsx': 'components/Loader.jsx',
    'Carousel.jsx': 'components/Carousel.jsx',
    'Card.jsx': 'components/Card.jsx',
    'MainCard.jsx': 'components/MainCard.jsx',
    'LatestUpdates.jsx': 'components/LatestUpdates.jsx',
    'SubCard.jsx': 'components/SubCard.jsx',
    'FloatingButton.jsx': 'components/FloatingButton.jsx',
    'Heading.jsx': 'components/Heading.jsx',
    'Instagram.jsx': 'components/Instagram.jsx',
    'FAQ.jsx': 'components/FAQ.jsx',
    'App_modern.css': 'styles/App_modern.css',
    'App.css': 'styles/App.css',
    'index.css': 'styles/index.css',
    'theme.css': 'styles/theme.css',
    'useToast.js': 'hooks/useToast.js',
    'Api/useDeleteApi.js': 'api/useDeleteApi.js',
    'Api/useGetApi.js': 'api/useGetApi.js',
    'Api/usePostApi.js': 'api/usePostApi.js',
    'Api/usePutApi.js': 'api/usePutApi.js',
    'About.jsx': 'pages/About.jsx',
    'ContactUs.jsx': 'pages/ContactUs.jsx',
    'AdminPanel.jsx': 'pages/AdminPanel.jsx',
    'Login.jsx': 'pages/Login.jsx',
    'NotFound.jsx': 'pages/NotFound.jsx',
    'InnerCard.jsx': 'pages/InnerCard.jsx',
}
for dst in {Path(v).parent for v in moves.values()}:
    (root / dst).mkdir(parents=True, exist_ok=True)
for src, dst in moves.items():
    source = root / src
    target = root / dst
    if source.exists() and not target.exists():
        shutil.move(str(source), str(target))
        print('MOVED', src, '->', dst)
    elif target.exists():
        print('ALREADY', dst)
    else:
        print('MISSING', src)

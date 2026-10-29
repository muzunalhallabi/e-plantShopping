const unsplash = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=960&q=85`;

export const categories = [
  {
    id: 'easy-care',
    name: 'Easy-care favorites',
    description: 'The low-fuss greens that make any room feel more alive.',
    products: [
      { id: 'snake-plant', name: 'Snake Plant', botanical: 'Dracaena trifasciata', price: 28, image: unsplash('photo-1501004318641-b39e6451bec6'), badge: 'Hard to kill', description: 'Sculptural, upright leaves bring an easy bit of drama to a sunny corner.' },
      { id: 'zz-plant', name: 'ZZ Plant', botanical: 'Zamioculcas zamiifolia', price: 34, image: unsplash('photo-1632207691143-643e2a9a9361'), badge: 'Low light', description: 'Glossy leaves and a wonderfully forgiving nature make this a desk favorite.' },
      { id: 'rubber-plant', name: 'Rubber Plant', botanical: 'Ficus elastica', price: 42, image: unsplash('photo-1614594975525-e45190c55d0b'), badge: 'Statement size', description: 'Deep green, polished leaves add a rich, architectural feel.' },
      { id: 'golden-pothos', name: 'Golden Pothos', botanical: 'Epipremnum aureum', price: 24, image: 'https://cdn.pixabay.com/photo/2018/11/15/10/32/plants-3816945_1280.jpg', badge: 'Trailing', description: 'A cheerful trailing vine that looks lovely on shelves and in hanging pots.' },
      { id: 'monstera', name: 'Monstera Deliciosa', botanical: 'Monstera deliciosa', price: 48, image: unsplash('photo-1509423350716-97f9360b4e09'), badge: 'Our favorite', description: 'Iconic split leaves make this tropical beauty an instant focal point.' },
      { id: 'jade-plant', name: 'Jade Plant', botanical: 'Crassula ovata', price: 22, image: 'https://cdn.pixabay.com/photo/2016/11/21/16/05/cacti-1846147_1280.jpg', badge: 'Sun lover', description: 'A compact succulent with plump leaves and a calm, sculptural silhouette.' },
    ],
  },
  {
    id: 'pet-friendly',
    name: 'Pet-friendly greens',
    description: 'Leafy companions selected with curious cats and dogs in mind.',
    products: [
      { id: 'calathea', name: 'Calathea Orbifolia', botanical: 'Goeppertia orbifolia', price: 39, image: unsplash('photo-1545241047-6083a3684587'), badge: 'Pet friendly', description: 'Silvery, round leaves bring a soft pattern to warm, humid spaces.' },
      { id: 'parlor-palm', name: 'Parlor Palm', botanical: 'Chamaedorea elegans', price: 31, image: unsplash('photo-1463320726281-696a485928c7'), badge: 'Pet friendly', description: 'A graceful little palm with gentle fronds and an easygoing spirit.' },
      { id: 'boston-fern', name: 'Boston Fern', botanical: 'Nephrolepis exaltata', price: 27, image: 'https://pixabay.com/images/download/boston-fern-5114414_640.jpg', badge: 'Pet friendly', description: 'Feathery, fresh green fronds love a bright bathroom or shaded nook.' },
      { id: 'spider-plant', name: 'Spider Plant', botanical: 'Chlorophytum comosum', price: 21, image: 'https://pixabay.com/images/download/chlorophytum-3530413_640.jpg', badge: 'Pet friendly', description: 'A lively arching plant that grows charming little plantlets.' },
      { id: 'peperomia', name: 'Peperomia Green', botanical: 'Peperomia obtusifolia', price: 25, image: unsplash('photo-1598880940080-ff9a29891b85'), badge: 'Pet friendly', description: 'Compact, glossy leaves make this a lovely choice for a small shelf.' },
      { id: 'prayer-plant', name: 'Prayer Plant', botanical: 'Maranta leuconeura', price: 32, image: unsplash('photo-1497250681960-ef046c08a56e'), badge: 'Pet friendly', description: 'Painted leaves fold gently upward in the evening light.' },
    ],
  },
  {
    id: 'blooming',
    name: 'Blooming beauties',
    description: 'Color, fragrance, and delicate flowers for a brighter home.',
    products: [
      { id: 'peace-lily', name: 'Peace Lily', botanical: 'Spathiphyllum wallisii', price: 36, image: 'https://pixabay.com/images/download/peace-lilies-4269365_640.jpg', badge: 'Airy & elegant', description: 'Elegant white blooms rise above lush leaves in soft, indirect light.' },
      { id: 'orchid', name: 'Phalaenopsis Orchid', botanical: 'Phalaenopsis', price: 44, image: unsplash('photo-1589296986498-28cd9406425d'), badge: 'Long blooming', description: 'A graceful spray of blooms that brightens your room for weeks.' },
      { id: 'african-violet', name: 'African Violet', botanical: 'Saintpaulia ionantha', price: 19, image: 'https://cdn.pixabay.com/photo/2016/08/19/19/48/flowers-1606041_1280.jpg', badge: 'Window sill', description: 'Velvety leaves and colorful flowers in a sweet, compact package.' },
      { id: 'anthurium', name: 'Anthurium Red', botanical: 'Anthurium andraeanum', price: 38, image: 'https://cdn.pixabay.com/photo/2022/02/22/05/45/marigold-7028063_1280.jpg', badge: 'Bright bloom', description: 'Shiny heart-shaped blooms bring a little celebration indoors.' },
      { id: 'jasmine', name: 'Arabian Jasmine', botanical: 'Jasminum sambac', price: 33, image: unsplash('photo-1592729645009-b96d1e63d14b'), badge: 'Sweetly scented', description: 'Starry white flowers fill a sunny room with a soft, sweet fragrance.' },
      { id: 'hoya', name: 'Hoya Carnosa', botanical: 'Hoya carnosa', price: 29, image: 'https://cdn.pixabay.com/photo/2019/07/15/18/28/flowers-4340127_1280.jpg', badge: 'Trailing bloom', description: 'Waxy leaves and clusters of tiny star-shaped flowers.' },
    ],
  },
];

export const plants = categories.flatMap((category) =>
  category.products.map((product) => ({ ...product, category: category.name, categoryId: category.id })),
);

let dbconfig=require('../dbconfig/db-connect');
dbconfig.connect(function(error){
    if(error){
        console.log('DB Connection error');
        process.exit(1);
    }
    else{
        console.log('connected successfully')



        dbconfig.get().collection('product').insertMany([{
            imagePage: 'https://hb.imgix.net/4817793a4611f48dae98d819c0940f0047956291.jpg?auto=compress,format&fit=crop&h=353&w=616&s=723c6d4386846dc6dfc5fba499e34ca0',
            title:'Call Of Duty',
            description:'Combat game',
            price:'20'
        },{
            imagePage: 'https://static01.nyt.com/images/2019/04/07/sunday-review/07Senior/07Senior-articleLarge.jpg?quality=75&auto=webp&disable=upscale',
            title:'Fortnite',
            description:'Fancy Game',
            price:'20'
        },{
            imagePage: 'https://d2e111jq13me73.cloudfront.net/sites/default/files/styles/share_link_image_large/public/screenshots/csm-game/need-for-speed-01.jpg?itok=MvFGo9_i',
            title:'Need For Speed PAYBACk',
            description:'Racing Game',
            price:'20'
        },{
            imagePage: 'https://hb.imgix.net/4817793a4611f48dae98d819c0940f0047956291.jpg?auto=compress,format&fit=crop&h=353&w=616&s=723c6d4386846dc6dfc5fba499e34ca0',
            title:'Call Of Duty',
            description:'Combat game',
            price:'20'
        },{
            imagePage: 'https://static01.nyt.com/images/2019/04/07/sunday-review/07Senior/07Senior-articleLarge.jpg?quality=75&auto=webp&disable=upscale',
            title:'Fortnite',
            description:'Fancy Game',
            price:'20'
        },{
            imagePage: 'https://d2e111jq13me73.cloudfront.net/sites/default/files/styles/share_link_image_large/public/screenshots/csm-game/need-for-speed-01.jpg?itok=MvFGo9_i',
            title:'Need For Speed PAYBACk',
            description:'Racing Game',
            price:'20'
        }])
    }
});


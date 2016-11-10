import {Meteor} from 'meteor/meteor';

export default function processYouTubeVideos(responseText) {
    let obj = JSON.parse(responseText);
    let items = obj.items;
    for (let item of items) {
        let newItem = {
            title: item.snippet.title,
            subtitle: item.snippet.channelTitle, // + ', ' + item.snippet.publishedAt,
            text: item.snippet.description,
            editorial: '',
            images: [item.snippet.thumbnails.medium.url],
            videos: [item.snippet.resourceId.videoId],
            author: 'admin',
            source: {
                name: item.snippet.channelTitle, 
                link: 'https://www.youtube.com/watch?v=' + item.snippet.resourceId.videoId,
                type: 'nonEmbeddable',
            },
            tags: ['video'],
            hidden: false,
                
            createdAt: new Date(),
            createdBy: 'admin',
            approvedAt: new Date(),
            approvedBy: 'admin',
            updatedAt: new Date(),
            updatedBy: 'admin',
                
            views: 0,
            rating: 0,
            ratingCount: 0,
            commentsCount: 0,
            
            extras: {
                style: {},
                partition: [1],
                orientation: 'vertical',
                mode: 'video',
                heightFactor: 1,
            }
        };
        //console.log("NEW ITEM", newItem);
        Meteor.call('posts.insert', newItem);
    }
    console.log("DONE PROCESS YOUTUBE VIDEOS");
}

/*
<iframe id="ytplayer" type="text/html" width="100%" height="340" 
src="http://www.youtube.com/embed/emKXAFZxKpsMGjBSw
?wmode=transparent&amp;autoplay=0&amp;amp;origin=&amp;amp;modestbranding=0&amp;amp;showinfo=0&amp;amp;cc_lang_pref=vi&amp;amp;hl=vi_VI&amp;amp;fs=1&amp;amp;cc_load_policy=1" frameborder="0" allowfullscreen="" style="vertical-align: top; max-width: 100%; min-width: 100%; width: 100%;"></iframe>


<iframe id="ytplayer" type="text/html" width="100%" height="240" 
src="http://www.youtube.com/embed/mdS5IU0j4Ds
?autoplay=0&amp;amp;origin=&amp;amp;modestbranding=0&amp;amp;showinfo=0&amp;amp;cc_lang_pref=vi&amp;amp;hl=vi_VI&amp;amp;fs=1&amp;amp;cc_load_policy=1" frameborder="0" allowfullscreen="" style="vertical-align: top; max-width: 100%; min-width: 100%; width: 100%;"></iframe>

*/
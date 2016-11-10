export default class PostModel {
    constructor(data = {}) {
        this._id = data._id || null,
        this.title = data.title || 'title',
        this.subtitle = data.subtitle || '';
        this.editorial = data.editorial || '';
        this.text = data.text || '';
        this.images = data.images || [];
        this.videos = data.videos || [];
        this.source = data.source || {name: '', link: ''};
        this.tags = data.tags || [];
        this.hidden = data.hidden || false;
        this.extras = data.extras || {
            style: {},
            mode: 'image',
            orientation: 'vertical',
            partition: '[1,2]',
            heightFactor: 1
        };
    }
    
    getImage() {
        if (this.images.length > 0 ) return this.images[0];
        return null;
    }
    
    getVideo() {
        if (this.videos.length > 0) return this.videos[0];
        return null;
    }

    videoEmbeddedStr() {
        return  "http://www.youtube.com/embed/" + this.getVideo()
			+ "?autoplay=0&amp;origin=&amp;modestbranding=0&amp;showinfo=0"
			+ "&amp;cc_lang_pref=vi&amp;hl=vi_VI&amp;fs=1&amp;cc_load_policy=1";
    }
      
    getLink() {
        if (this.source) return this.source.link;
        return null;
    }
    
    containsTag(tagName) {
        let tag = this.tags.find((val) => val === tagName);
        if (tag) return true;
        else return false;
    }
    
}
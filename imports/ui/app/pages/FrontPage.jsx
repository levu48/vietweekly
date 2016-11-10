import React from 'react';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import Paper from 'material-ui/Paper';
import {Posts} from '../../../api/posts';
import PostGroup from '../../components/PostGroup.jsx';
import Post from '../../components/Post.jsx';
import PostQuery from '../../components/PostQuery.jsx';
import PostModel from '../../../api/PostModel';
import Heading from '../../components/Heading.jsx';
import styles from '../../styles';
import {SpecialPosts} from '../../../api/specialPosts';

class FrontPage extends React.Component {
    constructor(props) {
        super(props);
    }
    
    componentWillMount() {
        
    }

    
    render() {       
        let post1 = 'Mỹ - Trung sẽ bàn về Biển Đông bên lề G20';
        if (this.props.specialPosts) {
            post1 = this.props.specialPosts['1'];
        }
        return (
            <Paper style={styles.rightColumn} zDepth={0}>
            
                <Heading text='Biển Đông' style={{marginTop: '10px'}} />
                <PostGroup {...this.props} orientation='horizontal' partition={[1]} >
                        <PostQuery query={{title: post1}} 
                                orientation='vertical' partition={[1,2]}
                                heightFactor={2} mode='image' initiallyExpanded={true}
                                />
                </PostGroup>
                
                
                <Heading text='Bầu cử Mỹ 2016' style={{marginTop: '10px'}} />
                <PostGroup {...this.props} orientation='horizontal' partition={[1]} >
                        <PostQuery query={{title: 'Donald Trump và đảng Cộng hòa: Trường hợp Âm binh vật Phù thủy?'}} 
                                orientation='vertical' partition={[1,2]}
                                heightFactor={2} mode='image' initiallyExpanded={false}
                                />
                </PostGroup>
                <PostGroup {...this.props} orientation='horizontal' partition={[1,1]} >
                        <PostQuery query={{title: 'Nhà hoạt động xã hội Kim Bernice Nguyễn tranh cử chức thị trưởng Garden Grove'}} 
                                orientation='vertical' partition={[1,2]}
                                heightFactor={2} mode='image' initiallyExpanded={false}
                                />
                       <PostQuery query={{title: 'Bảo Nguyễn sẽ không tái tranh cử chức thị trưởng Garden Grove'}} 
                                orientation='vertical' partition={[1,2]}
                                heightFactor={2} mode='image' initiallyExpanded={false}
                                />
                </PostGroup>
                <PostGroup {...this.props} orientation='horizontal' partition={[1,1]} >
                        <Post orientation='vertical' partition={[1,2]} initiallyExpanded={true}
                                data={new PostModel({
                                    images: ['http://i2.cdn.turner.com/cnnnext/dam/assets/151229111131-donald-trump-blood-wherever-exlarge-169.jpg'],
                                    title: 'Chuyện tình-một-đêm của nước Mỹ với Donald Trump',
                                    subtitle: 'Bình luận của Haroon Moghul',
                                    text: 'Đối diện với những khó khăn triền miên, tưởng không bao giờ dứt của một siêu cường, vừa phải lo việc phát triển kinh tế cơm no áo ấm, vừa phải lãnh đạo thế giới, đối phó với khủng hoảng mọc lên ở khắp nơi, người dân Mỹ đã mệt mỏi khi đi tìm người lãnh đạo tương lai, và đã chọn nhầm Donald Trump, với những lời lẽ bùi tai. Nhưng hởi ơi, như tình-một-đêm, chỉ sáng hôm sau, tất cả những xấu xí nhất của một gã không ra gì hiển hiện dưới ánh sáng mặt trời.',
                                    source: {
                                        name: 'Donald Trump: America\'s one-night stand',
                                        link: 'http://www.cnn.com/2016/08/21/opinions/donald-trump-americas-one-night-stand-moghul/index.html',
                                        type: 'external',
                                    }
                                })} />
                        <Post orientation='vertical' partition={[1,2]}  initiallyExpanded={true}
                                data={new PostModel({
                                    images: ['http://www.motherjones.com/files/imagecache/top-of-content-image/tim-kaine.jpg'],
                                    title: 'Clinton ngủ quên trên chiến thắng, coi chừng hồi mã thương',
                                    subtitle: 'Bình luận của Jake Novak',
                                    text: 'Phe tranh cử của Hillary Clinton chỉ chú trọng nói xấu Trump mà quên nói tốt về mình. Với sự tập trung chú ý gần như bị thôi miên của giới truyền thông đối với Donald Trump, nguy cơ xảy ra là Trump đang thay đổi với những thông điệp ôn hòa hơn, và các cuộc thăm dò cử tri mới nhất cho thấy tỷ lệ ủng hộ cho ông ta đang lên.',
                                    source: {
                                        name: 'Donald Trump is pulling ahead of Hillary Clinton in one big way',
                                        link: 'http://www.cnbc.com/2016/08/22/donald-trump-is-pulling-ahead-of-hillary-clinton-in-one-big-way-commentary.html',
                                        type: 'external',
                                    }
                                })} />
                </PostGroup>
                <Heading text='Đông Nam Á' style={{marginTop: '10px'}} />
                <PostGroup {...this.props} orientation='horizontal' partition={[1]} >
                        <PostQuery query={{title: 'Singapore và định mệnh phải đóng vai trò quốc tế'}} 
                                orientation='horizontal' partition={[1,2]}
                                heightFactor={2} mode='image'
                                />
                </PostGroup>
                {/*
                <Heading text='Âm nhạc' style={{marginTop: '10px'}} />
                <PostGroup {...this.props} orientation='horizontal' partition={[1]} >
                    <Post orientation='horizontal' partition={[2,1]}
                            heightFactor={2}
                            mode='video'
                            data = {new PostModel({
                                        videos: ['mdS5IU0j4Ds'],
                                        images: ['http://www.asianews.it/files/img/CINA_-_USA_-_mar_cineseoki.jpg'],
                                        title: 'Kim cương rỉ sét',
                                        subtitle: 'Joan Baez',
                                        text: 'Một trong những tuyệt tác phẩm của nhạc sĩ được mệnh danh là Nữ hoàng Dân ca Mỹ của thập niên 1960',
                                    })} />
                </PostGroup>
                */}

            </Paper>
        );
    }
}

export default createContainer(() => {
    return {
        specialPosts: SpecialPosts.findOne({})
    }
}, FrontPage);
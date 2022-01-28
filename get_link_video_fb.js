function get_data() {
    const data = document.body.innerHTML;
    const explode_data = data.split('"mime_type":');
    var data_arr = [];

    for(const each of explode_data) {
        data_arr.push(each);
    }

    return data_arr;
}

function get_video_link(data) {
    const pattern_1 = /^(?:"video\\\/webm")(.*)/;
    const pattern_2 = /^(?:"video\\\/mp4")(.*)/;
    var explode_data;
    var video_url = '';
    var video_width = '';
    var video_height = '';
    var result_arr = [];

    for(const each of data) {
        if(pattern_1.test(each) || pattern_2.test(each)) {
            explode_data = each.split(',');

            video_url = explode_data[2].replace('"base_url":', '');
            video_height = explode_data[4].replace('"height":', '');
            video_width = explode_data[5].replace('"width":', '');    

            var video_obj = {width: video_width, height: video_height, url: video_url};

            result_arr.push(video_obj);
        }
    }
    
    // Remove duplicate url
    const urls = result_arr.map(param => param.url);
    const filtered = result_arr.filter(({url}, index) => !urls.includes(url, index + 1));

    return filtered;
}

function get_audio_link(data) {
    const pattern = /^(?:"audio\\\/mp4")(.*)/;
    var audio_url;
    var result_arr = [];

    for(const each of data) {
        if(pattern.test(each)) {
            audio_url = each.split(',')[2].replace('"base_url":', '');

            result_arr.push(audio_url);
        }
    }

    return [...new Set(result_arr)];
}


function remove_slashes(string) {
    string = string.replace(/\\/gm, '');

    return string;
}

function get_response() {
    const videos = get_video_link(get_data());
    const audios = get_audio_link(get_data());

    for(const video of videos) {
        var url = remove_slashes(video.url);
        var width = video.width;
        var height = video.height;

        console.log('----------VIDEO----------');
        console.log(`Width: ${width}`);
        console.log(`Height: ${height}`);
        console.log(`URL: ${url}`);
    }

    for(const audio of audios) {
        var url = remove_slashes(audio);

        console.log('----------AUDIO----------');
        console.log(`URL: ${url}`);
    }
}

get_response();
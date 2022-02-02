$(document).ready(function()
{
  $("#filter_input_field").keyup(function()
  {
    let hidden_count = 0;
    let show_left_side;
    let search_value = $(this).val();
    
    $(".real_time_filter_content_items").each(function(i)
    {
      let keyword = $(this).children("p:last-child").text();
      
      if (filter_search(keyword, search_value))
      {
        if (i % 2 == 0)
        {
          show_left_side = true;
        }
        else
        {
          if (show_left_side == true)
          {
            element_show(i);        /* 左側要素: 表示 */
            element_show(i + 1);    /* 右側要素: 表示 */
          }
          else
          {
            element_hide(i);        /* 左側要素: 非表示 */
            element_show(i + 1);    /* 右側要素: 表示 */
          }
        }
      }
      else
      {
        hidden_count++;
        
        if (i % 2 == 0)
        {
          show_left_side = false;
        }
        else
        {
          if (show_left_side == true)
          {
            element_show(i);          /* 左側要素: 表示 */
            element_hide(i + 1);      /* 右側要素: 非表示 */
          }
          else
          {
            element_erase(i);         /* 左側要素: 消去 */
            element_erase(i + 1);     /* 右側要素: 消去 */
          }
        }
      }
      
      if (hidden_count == $(".real_time_filter_content_items").length - 1)
      {
        /* 1要素だけ表示する場合は表示要素を左上に表示する. */
        $(".visibility_hidden").addClass("display_hidden");
        $(".visibility_hidden").removeClass("visibility_hidden");
      }
    });
  });
  
  /* 関数: 要素表示　　         */
  /* 引数: 位置                 */
  /* 戻り値: none               */
  function element_show(position)
  {
    $(".real_time_filter_content_items:nth-of-type(" + position + ")").removeClass("visibility_hidden");
    $(".real_time_filter_content_items:nth-of-type(" + position + ")").removeClass("display_hidden");
  }
  
  /* 関数: 要素非表示           */
  /* 引数: 位置                 */
  /* 戻り値: none               */
  function element_hide(position)
  {
    $(".real_time_filter_content_items:nth-of-type(" + position + ")").addClass("visibility_hidden");
    $(".real_time_filter_content_items:nth-of-type(" + position + ")").removeClass("display_hidden");
  }
  
  /* 関数: 要素消去             */
  /* 引数: 位置                 */
  /* 戻り値: none               */
  function element_erase(position)
  {
    $(".real_time_filter_content_items:nth-of-type(" + position + ")").removeClass("visibility_hidden");
    $(".real_time_filter_content_items:nth-of-type(" + position + ")").addClass("display_hidden");
  }
  
  /* 関数: フィルター検索       */
  /* 引数: テキスト             */
  /*       検索値               */
  /* 戻り値: true  : 一致する   */
  /*         false : 一致しない */
  function filter_search(text, search_value)
  {
    let result = false;
    let split_text = text.split(" ");
    
    for (let i = 0; i < split_text.length; i++)
    {
      if (check_forward_match(split_text[i], search_value))
      {
        result = true;
        break;
      }
    }
    
    return result;
  }
  
  /* 関数: 前方一致確認         */
  /* 引数: テキスト             */
  /*       検索値               */
  /* 戻り値: true  : 一致する   */
  /*         false : 一致しない */
  function check_forward_match(text, search_value)
  {
    let regex = new RegExp("^" + search_value + ".*");
    
    return regex.test(text);
  }
});
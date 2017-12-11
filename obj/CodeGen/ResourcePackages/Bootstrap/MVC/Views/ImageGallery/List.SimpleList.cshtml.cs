#pragma warning disable 1591
//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//     Runtime Version:4.0.30319.42000
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace SitefinityWebApp.ResourcePackages.Bootstrap.MVC.Views.ImageGallery
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Net;
    using System.Text;
    using System.Web;
    using System.Web.Helpers;
    using System.Web.Mvc;
    using System.Web.Mvc.Ajax;
    using System.Web.Mvc.Html;
    using System.Web.Routing;
    using System.Web.Security;
    using System.Web.UI;
    using System.Web.WebPages;
    
    #line 3 "..\..\ResourcePackages\Bootstrap\MVC\Views\ImageGallery\List.SimpleList.cshtml"
    using Telerik.Sitefinity;
    
    #line default
    #line hidden
    
    #line 4 "..\..\ResourcePackages\Bootstrap\MVC\Views\ImageGallery\List.SimpleList.cshtml"
    using Telerik.Sitefinity.Frontend.Media.Mvc.Helpers;
    
    #line default
    #line hidden
    
    #line 7 "..\..\ResourcePackages\Bootstrap\MVC\Views\ImageGallery\List.SimpleList.cshtml"
    using Telerik.Sitefinity.Frontend.Media.Mvc.Models.ImageGallery;
    
    #line default
    #line hidden
    
    #line 5 "..\..\ResourcePackages\Bootstrap\MVC\Views\ImageGallery\List.SimpleList.cshtml"
    using Telerik.Sitefinity.Frontend.Mvc.Helpers;
    
    #line default
    #line hidden
    
    #line 6 "..\..\ResourcePackages\Bootstrap\MVC\Views\ImageGallery\List.SimpleList.cshtml"
    using Telerik.Sitefinity.Modules.Pages;
    
    #line default
    #line hidden
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("RazorGenerator", "2.0.0.0")]
    [System.Web.WebPages.PageVirtualPathAttribute("~/ResourcePackages/Bootstrap/MVC/Views/ImageGallery/List.SimpleList.cshtml")]
    public partial class List_SimpleList : System.Web.Mvc.WebViewPage<Telerik.Sitefinity.Frontend.Mvc.Models.ContentListViewModel>
    {
        public List_SimpleList()
        {
        }
        public override void Execute()
        {
WriteLiteral("\n");

            
            #line 9 "..\..\ResourcePackages\Bootstrap\MVC\Views\ImageGallery\List.SimpleList.cshtml"
Write(Html.Script(ScriptRef.JQuery, "top"));

            
            #line default
            #line hidden
WriteLiteral("\n\n<div");

WriteAttribute("class", Tuple.Create(" class=\"", 348), Tuple.Create("\"", 371)
            
            #line 11 "..\..\ResourcePackages\Bootstrap\MVC\Views\ImageGallery\List.SimpleList.cshtml"
, Tuple.Create(Tuple.Create("", 356), Tuple.Create<System.Object, System.Int32>(Model.CssClass
            
            #line default
            #line hidden
, 356), false)
);

WriteLiteral(">\n\n");

            
            #line 13 "..\..\ResourcePackages\Bootstrap\MVC\Views\ImageGallery\List.SimpleList.cshtml"
    
            
            #line default
            #line hidden
            
            #line 13 "..\..\ResourcePackages\Bootstrap\MVC\Views\ImageGallery\List.SimpleList.cshtml"
     foreach (var item in Model.Items)
    {
        var thumbnailViewModel = (ThumbnailViewModel)item;


            
            #line default
            #line hidden
WriteLiteral("    <a");

WriteLiteral(" class=\"text-center\"");

WriteAttribute("title", Tuple.Create(" title=\"", 506), Tuple.Create("\"", 608)
            
            #line 17 "..\..\ResourcePackages\Bootstrap\MVC\Views\ImageGallery\List.SimpleList.cshtml"
, Tuple.Create(Tuple.Create("", 514), Tuple.Create<System.Object, System.Int32>(string.IsNullOrEmpty(item.Fields.Description) ? item.Fields.Title : item.Fields.Description
            
            #line default
            #line hidden
, 514), false)
);

WriteLiteral(">\n      <img");

WriteAttribute("src", Tuple.Create(" src=\"", 621), Tuple.Create("\"", 661)
            
            #line 18 "..\..\ResourcePackages\Bootstrap\MVC\Views\ImageGallery\List.SimpleList.cshtml"
, Tuple.Create(Tuple.Create("", 627), Tuple.Create<System.Object, System.Int32>(thumbnailViewModel.ThumbnailUrl
            
            #line default
            #line hidden
, 627), false)
);

WriteAttribute("alt", Tuple.Create(" alt=\'", 662), Tuple.Create("\'", 760)
            
            #line 18 "..\..\ResourcePackages\Bootstrap\MVC\Views\ImageGallery\List.SimpleList.cshtml"
, Tuple.Create(Tuple.Create("", 668), Tuple.Create<System.Object, System.Int32>(System.Text.RegularExpressions.Regex.Replace(item.Fields.AlternativeText, @"[^\w\d_-]", "")
            
            #line default
            #line hidden
, 668), false)
);

WriteLiteral(" \n                ");

            
            #line 19 "..\..\ResourcePackages\Bootstrap\MVC\Views\ImageGallery\List.SimpleList.cshtml"
           Write(Html.GetWidthAttributeIfExists(thumbnailViewModel.Width));

            
            #line default
            #line hidden
WriteLiteral("\n");

WriteLiteral("                ");

            
            #line 20 "..\..\ResourcePackages\Bootstrap\MVC\Views\ImageGallery\List.SimpleList.cshtml"
           Write(Html.GetHeightAttributeIfExists(thumbnailViewModel.Height));

            
            #line default
            #line hidden
WriteLiteral(" />\n    </a>\n");

            
            #line 22 "..\..\ResourcePackages\Bootstrap\MVC\Views\ImageGallery\List.SimpleList.cshtml"
    }

            
            #line default
            #line hidden
WriteLiteral("</div>\n");

            
            #line 24 "..\..\ResourcePackages\Bootstrap\MVC\Views\ImageGallery\List.SimpleList.cshtml"
 if (Model.ShowPager)
{
    
            
            #line default
            #line hidden
            
            #line 26 "..\..\ResourcePackages\Bootstrap\MVC\Views\ImageGallery\List.SimpleList.cshtml"
Write(Html.Action("Index", "ContentPager", new
       {
           currentPage = Model.CurrentPage,
           totalPagesCount = Model.TotalPagesCount.Value,
           redirectUrlTemplate = ViewBag.RedirectPageUrlTemplate
       }));

            
            #line default
            #line hidden
            
            #line 31 "..\..\ResourcePackages\Bootstrap\MVC\Views\ImageGallery\List.SimpleList.cshtml"
         
}

            
            #line default
            #line hidden
        }
    }
}
#pragma warning restore 1591

/*jshint browser:true, jQuery: true, forin: true, laxbreak:true */
/*global BrowserID:true, PageController: true */
/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Mozilla BrowserID.
 *
 * The Initial Developer of the Original Code is Mozilla.
 * Portions created by the Initial Developer are Copyright (C) 2011
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */
BrowserID.Modules.ForgotPassword = (function() {
  "use strict";

  var ANIMATION_TIME = 250,
      bid = BrowserID,
      helpers = bid.Helpers,
      dialogHelpers = helpers.Dialog,
      dom = bid.DOM,
      lastEmail = "";

  function cancelEvent(event) {
    if (event) event.preventDefault();
  }

  function resetPassword(event) {
    cancelEvent(event);

    var self=this;
    dialogHelpers.resetPassword.call(self, self.email);
  }

  function cancelResetPassword(event) {
    cancelEvent(event);

    this.close("cancel_state");
  }

  var ForgotPassword = bid.Modules.PageModule.extend({
    start: function(options) {
      var self=this;
      self.email = options.email;
      self.renderDialog("forgotpassword", {
        email: options.email || ""
      });

      self.bind("#cancel_forgot_password", "click", cancelResetPassword);

      ForgotPassword.sc.start.call(self, options);
    },

    submit: resetPassword,
    resetPassword: resetPassword,
    cancelResetPassword: cancelResetPassword
  });

  return ForgotPassword;

}());